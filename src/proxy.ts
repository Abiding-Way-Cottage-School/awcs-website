import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';

import { authConfig } from '@/auth.config';

/**
 * Optimistic, cookie-only gate for the portal and admin areas.
 *
 * This is deliberately not the security boundary: every page, server action
 * and route handler re-checks the session through `src/lib/dal`. The proxy
 * exists so an anonymous visitor is sent to sign-in before anything renders,
 * and a family member is kept out of /admin without a database round-trip.
 *
 * The adapter-less Auth.js instance lives here and only here. Auth.js keeps
 * module-level flags about which provider kinds it has seen, so an
 * adapter-less instance in the same bundle as the full one would fail; the
 * proxy is its own bundle.
 */
const { auth } = NextAuth(authConfig);

/** Pages an anonymous visitor must be able to reach, without trailing slash. */
const publicPaths = new Set(['/portal/sign-in', '/portal/verify', '/portal/error']);

function withoutTrailingSlash(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export const proxy = auth((req) => {
  const pathname = withoutTrailingSlash(req.nextUrl.pathname);

  if (publicPaths.has(pathname)) {
    return NextResponse.next();
  }

  const user = req.auth?.user;
  if (!user) {
    const signIn = new URL('/portal/sign-in/', req.nextUrl);
    signIn.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }

  if (pathname.startsWith('/admin') && user.role !== 'admin') {
    return NextResponse.redirect(new URL('/portal/?denied=1', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*'],
};
