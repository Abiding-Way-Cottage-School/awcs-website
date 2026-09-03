'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { familyFormMessages } from '@/content/portal-forms';
import { fail, type ActionResult } from '@/lib/action-result';
import { clientIp, requireUser } from '@/lib/dal';
import { signAssignment } from '@/lib/dal/forms';
import { fieldErrors, idSchema, stripActionKeys } from '@/lib/validation';

const signSchema = z.object({
  signerName: z
    .string({ error: familyFormMessages.nameRequired })
    .trim()
    .min(2, { error: familyFormMessages.nameRequired })
    .max(120, { error: familyFormMessages.nameTooLong }),
  agree: z.literal('on', { error: familyFormMessages.agreeRequired }),
});

/**
 * Signs one of the family's own forms. The assignment id is bound from the
 * page; the data layer confirms it belongs to whoever is signed in and is
 * still unsigned, and records the text as it stood at this moment.
 */
export async function signForm(
  assignmentId: string,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireUser();

  const id = idSchema.safeParse(assignmentId);
  if (!id.success) return fail(familyFormMessages.notYours);

  const parsed = signSchema.safeParse(stripActionKeys(formData));
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    const first = errors.signerName?.[0] ?? errors.agree?.[0] ?? familyFormMessages.nameRequired;
    return fail(first, errors);
  }

  const h = await headers();
  const outcome = await signAssignment({
    assignmentId: id.data,
    userId: user.id,
    signerName: parsed.data.signerName,
    ip: await clientIp(),
    userAgent: h.get('user-agent'),
  });

  switch (outcome) {
    case 'missing':
      return fail(familyFormMessages.notYours);
    case 'already-signed':
      return fail(familyFormMessages.alreadySigned);
    case 'retired':
      return fail(familyFormMessages.retired);
    case 'superseded':
      return fail(familyFormMessages.superseded);
    case 'signed':
      break;
  }

  revalidatePath('/portal');
  revalidatePath('/portal/(app)/forms/[id]', 'page');
  revalidatePath('/admin/forms');
  redirect('/portal/?signed=1');
}
