import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';

/**
 * Chrome for the public marketing pages: the meta-line header, the content,
 * and the framed olive footer.
 *
 * This is a component rather than a `(site)` route group on purpose. Next 16's
 * static export writes a route group's RSC prefetch payload to a directory
 * (`__next.!KHNpdGUp/__PAGE__.txt`) while the router requests it as a flat
 * dotted filename, so every page load 404s on a static host. Wrapping pages
 * explicitly gives the same separation with none of that: the future member
 * area and /admin simply won't use this shell. See docs/ROADMAP.md.
 */
export default function SiteShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
