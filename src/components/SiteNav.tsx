'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { nav } from '@/content/site';

/**
 * Primary navigation.
 *
 * Desktop: sections open a dropdown on hover and on click, and close on Escape
 * or an outside click. Keyboard users get a real <button aria-expanded>, not a
 * hover-only menu.
 *
 * Below 64rem the whole thing becomes a disclosure panel behind a menu button,
 * with each section expanding in place.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Any navigation closes everything; on a static export the pathname changes
  // without a remount, so this cannot live in an event handler alone.
  useEffect(() => {
    setOpenSection(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpenSection(null);
        setMobileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenSection(null);
      setMobileOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Trailing slashes are on, so compare normalised paths.
  const normalise = (href: string) =>
    href.endsWith('/') && href !== '/' ? href.slice(0, -1) : href;
  const here = normalise(pathname ?? '/');
  const isCurrent = (href: string) => normalise(href) === here;
  const inSection = (href: string) =>
    href !== '/' && here.startsWith(normalise(href));

  return (
    <div ref={rootRef}>
      <button
        type="button"
        className="site-nav__burger"
        aria-expanded={mobileOpen}
        aria-controls="site-nav"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span className="site-nav__burger-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        Menu
      </button>

      <nav
        id="site-nav"
        className="site-nav"
        aria-label="Primary"
        data-mobile-open={mobileOpen}
      >
        {nav.map((section) => {
          if (!section.children) {
            const portal = section.href === '/portal/';
            return (
              <div key={section.href} className="site-nav__item">
                <Link
                  href={section.href}
                  className={
                    portal
                      ? 'site-nav__link site-nav__link--portal'
                      : 'site-nav__link'
                  }
                  aria-current={isCurrent(section.href) ? 'page' : undefined}
                >
                  {section.label}
                </Link>
              </div>
            );
          }

          const open = openSection === section.href;

          return (
            <div
              key={section.href}
              className="site-nav__item"
              data-open={open}
              onMouseEnter={() => setOpenSection(section.href)}
              onMouseLeave={() =>
                setOpenSection((cur) => (cur === section.href ? null : cur))
              }
            >
              <button
                type="button"
                className="site-nav__toggle"
                aria-expanded={open}
                aria-current={inSection(section.href) ? 'true' : undefined}
                onClick={() => setOpenSection(open ? null : section.href)}
              >
                {section.label}
                <span className="site-nav__caret" aria-hidden="true" />
              </button>

              <div className="site-nav__menu">
                {section.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    aria-current={isCurrent(child.href) ? 'page' : undefined}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
