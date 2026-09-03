import 'server-only';

import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import Resend from 'next-auth/providers/resend';

import { authConfig } from '@/auth.config';
import { db } from '@/db';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';

/**
 * The full Auth.js instance: magic links by email, users in Postgres.
 *
 * `NextAuth` is given a function rather than an object so that nothing here
 * touches the database until a request arrives. The adapter needs a database
 * handle when it is constructed, and `db()` throws without DATABASE_URL —
 * which `next build` deliberately does not have.
 *
 * Signing in is invite-only. Auth.js hands the `signIn` callback a plausible
 * user object even for an address it has never seen (it makes one up, with a
 * fresh id), so `!!user` proves nothing; the callback looks the address up
 * itself. The one exception is ADMIN_EMAILS: an address on that list becomes
 * a director on its first sign-in, which is how the first director gets in
 * before any user rows exist.
 */

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(normaliseEmail)
    .filter(Boolean);
}

export const { handlers, auth, signIn, signOut } = NextAuth(async () => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUTH_RESEND_FROM;

  return {
    ...authConfig,
    adapter: DrizzleAdapter(db(), {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    providers: [
      // Auth.js also reads AUTH_RESEND_KEY on its own; undefined values are
      // left out so its defaults are not overwritten with nothing.
      Resend({ ...(apiKey && { apiKey }), ...(from && { from }) }),
    ],
    callbacks: {
      ...authConfig.callbacks,
      async signIn({ user }) {
        const email = user.email ? normaliseEmail(user.email) : null;
        if (!email) return false;

        // Auth.js wraps anything thrown here as AccessDenied, so the real
        // cause is logged first: a Neon outage or an unapplied migration
        // should not be read off the server log as a refused address.
        try {
          const [existing] = await db()
            .select({ active: users.active })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
          if (existing) return existing.active;

          if (adminEmails().includes(email)) {
            await db().insert(users).values({ email, role: 'admin', name: null });
            return true;
          }
        } catch (error) {
          console.error('[auth][signIn] database error', error);
          throw error;
        }

        return false;
      },
    },
  };
});
