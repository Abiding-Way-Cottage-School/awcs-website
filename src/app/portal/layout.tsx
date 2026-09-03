import type { Metadata } from 'next';

import { school } from '@/content/site';

import '@/styles/portal.css';

export const metadata: Metadata = {
  // The object form keeps the root layout's title template, so pages read
  // "Sign in · Abiding Way Cottage School" like the rest of the site.
  title: { default: 'Family Portal', template: `%s · ${school.name}` },
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

/**
 * Everything under /portal/: the stylesheet and the noindex, nothing more.
 *
 * The three public pages — sign in, check your email, error — live directly
 * under this segment and render bare, in the marketing look. The signed-in
 * pages live in the `(app)` route group beside them, whose own layout wraps
 * them in PortalShell. The split is by route, deliberately: a layout cannot
 * see the pathname, and deciding by session would put the shell around the
 * sign-in page for anyone who still holds a cookie (a closed account, say).
 */
export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
