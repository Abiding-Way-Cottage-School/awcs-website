import Image from 'next/image';
import Link from 'next/link';

import PortalNav from '@/components/portal/PortalNav';
import SignOutButton from '@/components/portal/SignOutButton';
import type { NavItem } from '@/content/portal';
import { school } from '@/content/site';
import type { Role } from '@/db/schema';
import { asset } from '@/lib/asset';

/**
 * Chrome for the signed-in portal: a narrow column with the cottage mark, the
 * section's navigation and the signed-in family, beside the page. Below 60rem
 * the column becomes a strip across the top with the navigation in a row.
 *
 * It is the portal's counterpart to SiteShell and shares nothing with it but
 * the tokens: no marketing header, no footer, nothing to index.
 */
export default function PortalShell({
  nav,
  title,
  user,
  children,
}: {
  nav: NavItem[];
  title: 'Family Portal' | 'Admin';
  user: { familyName: string | null; email: string; role: Role };
  children: React.ReactNode;
}) {
  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <Link href="/portal/" className="portal-brand" aria-label={`${school.name} — ${title}`}>
          <Image
            src={asset('/brand/logo-mark-olive.png')}
            alt=""
            width={512}
            height={512}
            className="portal-brand__mark"
            sizes="44px"
            loading="eager"
          />
          <span className="portal-brand__text" aria-hidden="true">
            <span>{school.nameLines[0]}</span>
            <em>{title}</em>
          </span>
        </Link>

        <PortalNav items={nav} />

        <div className="portal-user">
          <p className="portal-user__name">{user.familyName ?? user.email}</p>
          {user.familyName ? <p className="portal-user__email">{user.email}</p> : null}
          {user.role === 'admin' ? <p className="portal-pill">Director</p> : null}
          <SignOutButton />
        </div>
      </aside>

      <main id="main" className="portal-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
