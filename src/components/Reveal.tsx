'use client';

import { useEffect } from 'react';

/**
 * The site's only piece of motion: a 400ms fade-up as a section enters view.
 *
 * Mounted once, it observes every element carrying `.reveal` rather than
 * wrapping each one in a client component, which keeps the page itself a
 * plain server component. Anything already on screen at load is revealed
 * immediately so the hero never flickers.
 */
export default function Reveal() {
  useEffect(() => {
    // JS is running, so let the fade-up apply. Without this the `.no-js`
    // fallback in site.css keeps everything permanently visible.
    document.documentElement.classList.remove('no-js');

    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

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
    return () => observer.disconnect();
  }, []);

  return null;
}
