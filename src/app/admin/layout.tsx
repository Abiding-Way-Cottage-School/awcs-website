import type { Metadata } from 'next';

import PortalShell from '@/components/portal/PortalShell';
import { portalNav } from '@/content/portal';
import { school } from '@/content/site';
import { getSession } from '@/lib/dal';

import '@/styles/portal.css';

export const metadata: Metadata = {
  // The object form keeps the root layout's title template, so pages read
  // "Users · Abiding Way Cottage School" like the rest of the site.
  title: { default: 'Admin', template: `%s · ${school.name}` },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * The directors' side. Like the portal layout it reads the session only to
 * show who is signed in; every admin page calls `requireAdmin()` itself. The
 * proxy has already turned away anonymous visitors and family accounts, so
 * an empty session here is only ever a page about to redirect.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const user = session?.user;

  if (!user?.id) {
    return <main id="main">{children}</main>;
  }

  return (
    <PortalShell
      nav={portalNav.admin}
      title="Admin"
      user={{ familyName: user.familyName, email: user.email ?? '', role: user.role }}
    >
      {children}
    </PortalShell>
  );
}
