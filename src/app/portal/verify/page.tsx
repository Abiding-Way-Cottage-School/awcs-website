import type { Metadata } from 'next';
import Link from 'next/link';

import AuthPage from '@/components/portal/AuthPage';
import { verifyPage } from '@/content/portal';

export const metadata: Metadata = { title: 'Check your email' };

export const dynamic = 'force-dynamic';

/** Where Auth.js sends someone once the magic link has been emailed. */
export default function VerifyPage() {
  return (
    <AuthPage eyebrow={verifyPage.eyebrow} heading={verifyPage.heading} lead={verifyPage.lead}>
      <div className="prose">
        {verifyPage.body.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
      <p>
        <Link href="/portal/sign-in/" className="link-more">
          {verifyPage.again}
        </Link>
      </p>
    </AuthPage>
  );
}
