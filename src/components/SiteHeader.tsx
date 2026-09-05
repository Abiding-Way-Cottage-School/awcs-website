import Image from 'next/image';
import Link from 'next/link';

import SiteNav from '@/components/SiteNav';
import { school } from '@/content/site';
import { asset } from '@/lib/asset';

/**
 * Light, pinned header: the typographic wordmark with the cottage mark beside
 * it, and the navigation to the right.
 *
 * The mark is `logo-mark-olive.png` — the full logo with the wordmark removed
 * from inside the ring and the ring redrawn tighter around the drawing, so the
 * space the text used to occupy is not left empty. The circle, sun, cottage and
 * path are all kept. The complete lockup still appears in the footer of every
 * page.
 *
 * It carries no alt text because the wordmark beside it already names the
 * school, and the two together are a single link.
 */
export default function SiteHeader() {
  const [first, second] = school.nameLines;

  return (
    <header className="site-header">
      <div className="container container--wide site-header__inner">
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
        <SiteNav />
      </div>
    </header>
  );
}
