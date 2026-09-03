'use server';

import { signOut } from '@/auth';

/** Clears the session cookie and lands on the sign-in page. */
export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/portal/sign-in' });
}
