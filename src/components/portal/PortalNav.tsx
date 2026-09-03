'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavItem } from '@/content/portal';

function trim(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

/**
 * Home matches only itself; every other entry also claims the pages beneath
 * it, so Users stays lit on a user's detail page.
 */
function isActive(pathname: string, href: string): boolean {
  const current = trim(pathname);
  const target = trim(href);
  if (target === '/portal') return current === target;
  return current === target || current.startsWith(`${target}/`);
}

export default function PortalNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="portal-nav" aria-label="Portal">
      <ul>
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={active ? 'portal-nav__link portal-nav__link--active' : 'portal-nav__link'}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
