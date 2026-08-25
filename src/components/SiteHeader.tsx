import Link from 'next/link';

import SiteNav from '@/components/SiteNav';
import { school } from '@/content/site';

/** Light, pinned header: typographic wordmark left, navigation right. */
export default function SiteHeader() {
  const [first, second] = school.nameLines;

  return (
    <header className="site-header">
      <div className="container container--wide site-header__inner">
        <Link href="/" className="wordmark">
          <span>{first}</span>
          <em>{second}</em>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
