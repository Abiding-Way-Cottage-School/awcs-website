'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { adminPayments } from '@/content/portal-payments';
import { fail, succeed, type ActionResult } from '@/lib/action-result';
import { requireAdmin } from '@/lib/dal';
import {
  createCharge,
  createChargeForAllActiveFamilies,
  deleteUnpaidPayment,
  getActiveFamily,
  markPaid,
  waivePayment,
} from '@/lib/dal/payments';
import { blankToUndefined, fieldErrors, paymentSchema, stripActionKeys } from '@/lib/validation';

/**
 * The directors' payment actions. Each one checks the session first, then
 * the shape of the input, then the row — a well-formed id is not a
 * permission. Expected failures come back as values for the form to show.
 */

const EVERYONE = 'all';

const chargeSchema = paymentSchema.extend({
  recipient: z
    .string({ error: adminPayments.add.chooseRecipient })
    .trim()
    .min(1, { error: adminPayments.add.chooseRecipient }),
});

const settleSchema = z.object({
  intent: z.enum(['paid', 'waived', 'delete']),
  note: z.preprocess(blankToUndefined, z.string().trim().max(200).optional()),
});

/**
 * Dollars typed by a person → whole cents for the schema. Anything that is
 * not a plain amount is passed through unchanged so zod reports it against
 * the amount field rather than this function guessing.
 */
function dollarsToCents(value: FormDataEntryValue | undefined): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim().replace(/^\$/, '').replace(/,/g, '');
  if (trimmed === '') return '';
  const match = /^(\d+)(?:\.(\d{1,2}))?$/.exec(trimmed);
  if (!match) return 'not-an-amount';
  const [, whole, fraction = ''] = match;
  return String(Number(whole) * 100 + Number(fraction.padEnd(2, '0')));
}

function revalidatePayments(): void {
  revalidatePath('/admin/payments');
  revalidatePath('/admin/users/[id]', 'page');
  revalidatePath('/portal');
}

export async function addCharge(
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();

  const raw = stripActionKeys(formData);
  const cents = dollarsToCents(raw.amount);
  const parsed = chargeSchema.safeParse({
    recipient: raw.recipient,
    description: raw.description,
    amountCents: cents,
    dueAt: raw.dueAt,
  });
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    // Only a value that never read as an amount gets the formatting hint;
    // the schema's own messages (too large, negative) reach the form as is.
    if (errors.amountCents && (cents === '' || cents === 'not-an-amount')) {
      errors.amountCents = [adminPayments.add.invalidAmount];
    }
    return fail(adminPayments.actions.invalid, errors);
  }

  const { recipient, ...input } = parsed.data;

  if (recipient === EVERYONE) {
    const count = await createChargeForAllActiveFamilies(input, admin.id);
    if (count === 0) return fail(adminPayments.add.nobodyActive);
    revalidatePayments();
    return succeed(adminPayments.add.addedAll(count));
  }

  const family = await getActiveFamily(recipient);
  if (!family) {
    return fail(adminPayments.add.unknownRecipient, {
      recipient: [adminPayments.add.unknownRecipient],
    });
  }

  await createCharge(family.id, input, admin.id);
  revalidatePayments();
  return succeed(adminPayments.add.addedOne(family.familyName ?? family.email));
}

/**
 * Marks a charge paid or waived, or deletes it — one action, chosen by the
 * confirm button pressed. Bound to the payment id in the row component.
 */
export async function settlePayment(
  paymentId: string,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();

  const raw = stripActionKeys(formData);
  const parsed = settleSchema.safeParse({ intent: raw.intent, note: raw.note });
  if (!parsed.success || typeof paymentId !== 'string' || paymentId === '') {
    return fail(adminPayments.actions.invalid);
  }

  const { intent, note } = parsed.data;
  let changed: boolean;
  let message: string;

  if (intent === 'paid') {
    changed = await markPaid(paymentId, admin.id, note);
    message = adminPayments.actions.marked;
  } else if (intent === 'waived') {
    changed = await waivePayment(paymentId, admin.id, note);
    message = adminPayments.actions.waived;
  } else {
    changed = await deleteUnpaidPayment(paymentId);
    message = adminPayments.actions.deleted;
  }

  revalidatePayments();
  if (!changed) return fail(adminPayments.actions.alreadySettled);
  return succeed(message);
}
