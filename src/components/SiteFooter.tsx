import Image from 'next/image';

import { asset } from '@/lib/asset';

import { footer, school } from '@/content/site';

/**
 * The closing page of the handbook: the mark, the wordmark, the contact line
 * and a Charlotte Mason quote, all inside the thin inset frame.
 */
export default function SiteFooter() {
  const [first, second] = school.nameLines;
  // Baked in at build time; a static export re-stamps it on every deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer surface-dark framed">
      <div className="container">
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

        <div className="site-footer__meta">
          <a href={`mailto:${school.email}`}>{school.email}</a>
          <span>{school.meeting.venue}</span>
          <span>{school.city}</span>
        </div>

        <blockquote>
          {footer.quote.text}
          <cite>{footer.quote.cite}</cite>
        </blockquote>

        <p className="site-footer__legal">
          © {year} {school.name}
        </p>
      </div>
    </footer>
  );
}
