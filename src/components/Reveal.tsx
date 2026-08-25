'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * The site's only piece of motion: a 400ms fade-up as a section enters view.
 *
 * Mounted once in the root layout, it observes every element carrying `.reveal`
 * rather than wrapping each one in a client component, which keeps the pages
 * themselves plain server components.
 *
 * It re-runs on every pathname change. The App Router swaps page content without
 * remounting the layout, so a mount-only effect would leave every `.reveal` block
 * on the *next* page stuck at opacity 0 — the page would navigate to a blank
 * screen. Re-querying per navigation is what keeps client-side nav working.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    // JS is running, so let the fade-up apply. Without this the `.no-js`
    // fallback in site.css keeps everything permanently visible.
    document.documentElement.classList.remove('no-js');

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not([data-revealed])'),
    );

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => {
        el.dataset.revealed = 'true';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = 'true';
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    targets.forEach((el) => observer.observe(el));

    // A safety net: if anything is still hidden shortly after a navigation —
    // an element the observer never fired for, or one already scrolled past —
    // reveal it rather than leave content invisible.
    const failsafe = window.setTimeout(() => {
      targets.forEach((el) => {
        if (el.dataset.revealed !== 'true' && el.getBoundingClientRect().top < window.innerHeight) {
          el.dataset.revealed = 'true';
        }
      });
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
