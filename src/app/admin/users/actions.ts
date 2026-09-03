'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { accountSwitch, userForm } from '@/content/portal-users';
import { fail, succeed, type ActionResult } from '@/lib/action-result';
import { requireAdmin } from '@/lib/dal';
import { createUser, setUserActive, updateUser, type UserWriteError } from '@/lib/dal/users';
import {
  emailSchema,
  familyNameSchema,
  fieldErrors,
  idSchema,
  roleSchema,
  stripActionKeys,
} from '@/lib/validation';

/**
 * The directors' account actions. Each one checks the caller first, then the
 * shape of the input, then hands off to the data layer, which checks the
 * caller again and applies the rules that need the database (unique email,
 * last open director). Refusals come back as values for the form to show;
 * only `redirect()` throws, and it is never inside a try.
 */

const userInputSchema = z.object({
  email: emailSchema,
  familyName: familyNameSchema,
  role: roleSchema,
});

const refusalCopy: Record<UserWriteError, string> = {
  'not-found': userForm.notFound,
  'email-taken': userForm.emailTaken,
  self: accountSwitch.isSelf,
  'last-admin': accountSwitch.lastAdmin,
  'self-demote': accountSwitch.selfDemote,
  'last-admin-demote': accountSwitch.lastAdminDemote,
};

function refused(reason: UserWriteError): ActionResult {
  const message = refusalCopy[reason];
  if (reason === 'email-taken') return fail(message, { email: [message] });
  if (reason === 'self-demote' || reason === 'last-admin-demote') {
    return fail(message, { role: [message] });
  }
  return fail(message);
}

export async function createUserAction(
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = userInputSchema.safeParse(stripActionKeys(formData));
  if (!parsed.success) return fail(userForm.invalid, fieldErrors(parsed.error));

  const result = await createUser(parsed.data);
  if (!result.ok) return refused(result.reason);

  revalidatePath('/admin/users');
  redirect(`/admin/users/${result.id}/?created=1`);
}

export async function updateUserAction(
  userId: string,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const id = idSchema.safeParse(userId);
  if (!id.success) return fail(userForm.notFound);

  const parsed = userInputSchema.safeParse(stripActionKeys(formData));
  if (!parsed.success) return fail(userForm.invalid, fieldErrors(parsed.error));

  const result = await updateUser(id.data, parsed.data);
  if (!result.ok) return refused(result.reason);

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${id.data}`);
  return succeed(userForm.saved);
}

/**
 * Closing an account is the one destructive thing here, so it needs the
 * confirm field the two-step form only sends after the director has said
 * yes. Reopening needs no ceremony.
 */
export async function setUserActiveAction(
  userId: string,
  active: boolean,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const id = idSchema.safeParse(userId);
  if (!id.success) return fail(userForm.notFound);

  if (!active && formData.get('confirm') !== 'yes') return fail(accountSwitch.notConfirmed);

  const result = await setUserActive(id.data, active === true);
  if (!result.ok) return refused(result.reason);

  revalidatePath('/admin/users');
  revalidatePath(`/admin/users/${id.data}`);
  return succeed(active ? accountSwitch.reopened : accountSwitch.closed);
}
