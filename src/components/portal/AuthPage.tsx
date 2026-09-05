import Image from 'next/image';
import Link from 'next/link';

import { school } from '@/content/site';
import { asset } from '@/lib/asset';

/**
 * The frame for the three public portal pages — sign in, check your email,
 * and error. It borrows the marketing site's look (lockup, eyebrow, heading,
 * italic lead) without its header or footer, so the page is one thing to do.
 * It is the page's <main> (the skip link's target); the portal layout above
 * it adds nothing, so the shell never appears around these pages.
 */
export default function AuthPage({
  eyebrow,
  heading,
  lead,
  children,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  children: React.ReactNode;
}) {
  const [first, second] = school.nameLines;

  return (
    <main id="main" className="portal-auth">
      <div className="container container--narrow portal-auth__inner">
        <Link href="/" className="brand-lockup" aria-label={`${school.name} — home`}>
          <span className="wordmark" aria-hidden="true">
            <span>{first}</span>
            <em>{second}</em>
          </span>
          <Image
            src={asset('/brand/logo-mark-olive.png')}
            alt=""
            width={512}
            height={512}
            className="brand-mark"
            sizes="52px"
            loading="eager"
          />
        </Link>

        <header className="portal-page-head">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{heading}</h1>
          {lead ? <span className="lead">{lead}</span> : null}
        </header>

        {children}
      </div>
    </main>
  );
}
