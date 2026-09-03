import type { NextAuthConfig } from 'next-auth';

/**
 * The half of the Auth.js configuration that is safe everywhere.
 *
 * No adapter, no database import, no providers: `src/proxy.ts` builds its own
 * Auth.js instance from this to read the session cookie on every portal
 * request, and it must stay light and free of database code. `src/auth.ts`
 * spreads this and adds the adapter and the Resend provider.
 *
 * `providers` must stay empty here. An email provider without an adapter
 * fails Auth.js's config assertions for every call, including session reads.
 *
 * Sessions are JWTs so the proxy can read them from the cookie alone. The
 * `jwt` callback sees the database row once, at sign-in; the `session`
 * callback copies the claims out of the token on every read — without it the
 * default callback strips everything but name, email and image.
 */
export const authConfig = {
  session: { strategy: 'jwt' },
  trustHost: true,
  pages: {
    signIn: '/portal/sign-in',
    verifyRequest: '/portal/verify',
    error: '/portal/error',
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      // `user` is only present on the sign-in call; later reads carry the token alone.
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.familyName = user.familyName ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id ?? token.sub ?? session.user.id;
        session.user.role = token.role ?? 'family';
        session.user.familyName = token.familyName ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
