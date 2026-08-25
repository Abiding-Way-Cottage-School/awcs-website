import Image from 'next/image';
import Link from 'next/link';

import { nav, quotes, school } from '@/content/site';
import { asset } from '@/lib/asset';

/** The closing page of the handbook: mark, contact, sitemap, and a quote. */
export default function SiteFooter() {
  const [first, second] = school.nameLines;
  // Baked in at build time; a static export re-stamps it on every deploy.
  const year = new Date().getFullYear();
  const sections = nav.filter((s) => s.children);

  return (
    <footer className="site-footer surface-dark framed">
      <div className="container container--wide">
        <div className="site-footer__top">
          <div>
            <Image
              src={asset('/brand/logo-cream.png')}
              alt=""
              width={512}
              height={512}
              className="site-footer__logo"
              aria-hidden="true"
            />
            <p className="site-footer__mark">
              {first}
              <em>{second}</em>
            </p>
            <div className="site-footer__contact">
              <p>
                <a href={`mailto:${school.email}`}>{school.email}</a>
              </p>
              <p>
                {school.meeting.venue}
                <br />
                {school.meeting.street}
                <br />
                {school.meeting.cityStateZip}
              </p>
              <p>
                {school.meeting.day}, {school.meeting.season}
              </p>
            </div>
          </div>

          <nav className="sitemap" aria-label="Footer">
            {sections.map((section) => (
              <div key={section.href}>
                <h2>{section.label}</h2>
                <ul>
                  {section.children?.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <blockquote style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}>
          {quotes.mason.text}
          <cite>{quotes.mason.cite}</cite>
        </blockquote>

        <div className="site-footer__bottom">
          <span>
            © {year} {school.name}
          </span>
          <Link href="/portal/">Family Portal</Link>
        </div>
      </div>
    </footer>
  );
}
