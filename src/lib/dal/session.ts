import 'server-only';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

import { auth } from '@/auth';
import { db } from '@/db';
import { users, type Role } from '@/db/schema';

/**
 * Who is asking. Every page, server action, route handler and data function
 * calls one of these; layouts only read `getSession()` for display and never
 * gate.
 *
 * The session cookie is trusted for identity, and then the row behind it is
 * read once per request: a director can close an account or change a role
 * and it takes effect on the family's next request, not at their next
 * sign-in. React's `cache` keeps that to one query however many callers
 * there are in a render.
 *
 * Pages want a redirect when nobody is there; route handlers want `null` so
 * they can answer 401 to a fetch. Both shapes are here, over one lookup.
 */

export type CurrentUser = {
  id: string;
  email: string;
  role: Role;
  familyName: string | null;
};

export const getSession = cache(() => auth());

const getUserRow = cache(async (id: string) => {
  const [row] = await db()
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      familyName: users.familyName,
      active: users.active,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return row ?? null;
});

/** The signed-in, active user — or null, for route handlers that answer 401. */
export const currentUserOrNull = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  const id = session?.user?.id;
  if (!id) return null;

  const row = await getUserRow(id);
  if (!row || !row.email || !row.active) return null;

  return { id: row.id, email: row.email, role: row.role, familyName: row.familyName };
});

/** The signed-in director — or null. */
export async function currentAdminOrNull(): Promise<CurrentUser | null> {
  const user = await currentUserOrNull();
  return user?.role === 'admin' ? user : null;
}

/** The signed-in, active user — or a redirect to sign-in. */
export async function requireUser(): Promise<CurrentUser> {
  const session = await getSession();
  const id = session?.user?.id;
  if (!id) redirect('/portal/sign-in/');

  const row = await getUserRow(id);
  if (!row || !row.email) redirect('/portal/sign-in/');
  if (!row.active) redirect('/portal/sign-in/?inactive=1');

  return { id: row.id, email: row.email, role: row.role, familyName: row.familyName };
}

/** The signed-in director — or a redirect to the family home. */
export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== 'admin') redirect('/portal/?denied=1');
  return user;
}

/**
 * The signed-in user, who must be `userId` themself or a director. For data
 * that belongs to one family — their tasks, their charges, their copy of a
 * form — so a well-formed id is never a permission on its own.
 */
export async function requireUserFor(userId: string): Promise<CurrentUser> {
  const user = await requireUser();
  if (user.role !== 'admin' && user.id !== userId) redirect('/portal/?denied=1');
  return user;
}

/** The caller's address as Vercel reports it: the first hop of x-forwarded-for. */
export async function clientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || h.get('x-real-ip');
}
