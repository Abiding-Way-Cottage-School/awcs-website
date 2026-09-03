'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { signInPage } from '@/content/portal';
import { fail, type ActionResult } from '@/lib/action-result';
import { emailSchema } from '@/lib/validation';

/**
 * Asks Auth.js to email a magic link.
 *
 * On success Auth.js redirects to the "check your email" page by throwing,
 * which is why only `AuthError` is caught: the redirect must propagate.
 *
 * Two kinds of `AuthError` arrive here and they mean different things:
 * - The sign-in callback returned false — the address is not on the list or
 *   the account is closed. Auth.js throws a bare `AccessDenied` with no
 *   cause. One message covers both cases, since telling them apart would
 *   reveal who is enrolled.
 * - Something failed — the database was unreachable, the callback threw, the
 *   adapter failed. Auth.js wraps the real exception as `cause.err` (an
 *   `AccessDenied` if the callback threw, an `AdapterError` if the adapter
 *   did). That is not a refusal and must not read as one, least of all to the
 *   first director bootstrapping through ADMIN_EMAILS with no database yet.
 */
export async function signInWithEmail(
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = emailSchema.safeParse(formData.get('email'));
  if (!parsed.success) {
    return fail(signInPage.invalid);
  }

  try {
    await signIn('resend', { email: parsed.data, redirectTo: '/portal/' });
  } catch (error) {
    if (error instanceof AuthError) {
      const wrapped = (error.cause as { err?: unknown } | undefined)?.err;
      if (error.type === 'AccessDenied' && !wrapped) {
        return fail(signInPage.notListed);
      }
      console.error('[sign-in]', error);
      return fail(signInPage.failed);
    }
    throw error;
  }

  // Unreachable: signIn redirects. Kept so every path returns a value.
  return { ok: true };
}
