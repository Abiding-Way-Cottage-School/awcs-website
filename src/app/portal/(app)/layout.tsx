import PortalShell from '@/components/portal/PortalShell';
import { portalNav } from '@/content/portal';
import { getSession } from '@/lib/dal';

export const dynamic = 'force-dynamic';

/**
 * The family side of the portal: every signed-in /portal/ page, in the shell.
 *
 * The session is read here for display only. A layout does not gate: it does
 * not re-render on navigation and cannot stop a child segment or a server
 * action from running, so every page calls `requireUser()` itself. The proxy
 * has already turned anonymous visitors away, so an empty session here is
 * only ever a page about to redirect; it renders bare rather than in a shell
 * with nobody in it.
 */
export default async function PortalAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const user = session?.user;

  if (!user?.id) {
    return <main id="main">{children}</main>;
  }

  return (
    <PortalShell
      nav={portalNav.family}
      title="Family Portal"
      user={{ familyName: user.familyName, email: user.email ?? '', role: user.role }}
    >
      {children}
    </PortalShell>
  );
}
