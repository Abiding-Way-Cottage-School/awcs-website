import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import AuthPage from '@/components/portal/AuthPage';
import { signInPage } from '@/content/portal';
import { getSession } from '@/lib/dal';

import SignInForm from './SignInForm';

export const metadata: Metadata = { title: 'Sign in' };

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * `?inactive=1` comes from requireUser() when a closed account still has a
 * cookie; `?error=` is Auth.js sending someone back here (SessionRequired and
 * the like). Neither needs a page of its own.
 *
 * Someone already signed in has nothing to do here and goes to the home page
 * — unless they were sent here because their account is closed, in which
 * case the home page would only send them straight back.
 */
export default async function SignInPageRoute({ searchParams }: { searchParams: SearchParams }) {
  const { error, inactive } = await searchParams;

  if (!inactive) {
    const session = await getSession();
    if (session?.user?.id) redirect('/portal/');
  }

  const notice = inactive ? signInPage.inactive : error ? signInPage.again : null;

  return (
    <AuthPage eyebrow={signInPage.eyebrow} heading={signInPage.heading} lead={signInPage.lead}>
      {notice ? (
        <p className="portal-notice" role="status">
          {notice}
        </p>
      ) : null}

      <SignInForm />

      <p className="portal-auth__foot">{signInPage.help}</p>
    </AuthPage>
  );
}
