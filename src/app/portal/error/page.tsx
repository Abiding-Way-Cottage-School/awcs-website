import type { Metadata } from 'next';
import Link from 'next/link';

import AuthPage from '@/components/portal/AuthPage';
import { errorPage } from '@/content/portal';

export const metadata: Metadata = { title: 'Sign-in problem' };

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type ErrorCode = keyof typeof errorPage.messages;

function codeFrom(value: string | string[] | undefined): ErrorCode {
  return typeof value === 'string' && value in errorPage.messages ? (value as ErrorCode) : 'Default';
}

/**
 * Auth.js lands here with `?error=AccessDenied|Verification|Configuration`.
 * AccessDenied is the common one — an address a director has not added — so
 * its copy says what to do about it rather than that something failed.
 */
export default async function AuthErrorPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;
  const copy = errorPage.messages[codeFrom(error)];

  return (
    <AuthPage eyebrow={errorPage.eyebrow} heading={copy.heading}>
      <p className="prose">{copy.body}</p>
      <p>
        <Link href="/portal/sign-in/" className="btn btn-ghost">
          {errorPage.retry}
        </Link>
      </p>
    </AuthPage>
  );
}
