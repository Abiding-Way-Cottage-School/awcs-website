import Link from 'next/link';

import { nav, school } from '@/content/site';

/**
 * The handbook prints a meta line across the top of every page — the school
 * name at one edge, the section name at the other, both in tracked caps.
 * The nav is that line.
 */
export default function SiteHeader() {
  const [first, second] = school.nameLines;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__mark">
          <span>{first}</span>
          <em>{second}</em>
        </Link>

        <nav className="site-nav" aria-label="Sections">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
