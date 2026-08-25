import Link from 'next/link';

import SiteShell from '@/components/SiteShell';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Page not found</span>
            <h1>We could not find that page.</h1>
            <span className="lead">
              It may have been moved, or the address may have a small error in it.
            </span>
            <div className="rule-short" />
            <Link className="btn btn-ghost" href="/">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
