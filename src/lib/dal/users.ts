import 'server-only';

import { and, asc, count, desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { users, type PaymentStatus, type Role } from '@/db/schema';

import { listAssignmentsForUser } from './forms';
import { listPaymentsFor, summarise } from './payments';
import { requireAdmin } from './session';

/**
 * Directors' view of accounts.
 *
 * Every function here calls `requireAdmin()` itself, so the pages and actions
 * that use it check twice. That is the point: a data function that assumes
 * its caller checked is one refactor away from leaking. React caches the
 * session and the user row, so the second check costs nothing.
 *
 * Dates leave here as ISO strings, never Date objects, so the DTOs can cross
 * into client components unchanged.
 */

export type UserSummary = {
  id: string;
  email: string;
  name: string | null;
  familyName: string | null;
  role: Role;
  active: boolean;
  createdAt: string;
  createdBy: string | null;
};

export type UserInput = {
  email: string;
  familyName: string;
  role: Role;
};

export type UserAssignmentSummary = {
  id: string;
  formId: string;
  formTitle: string;
  formVersion: number;
  currentVersion: number;
  formActive: boolean;
  assignedAt: string;
  dueAt: string | null;
  signedAt: string | null;
  signerName: string | null;
};

export type UserPaymentSummary = {
  id: string;
  description: string;
  amountCents: number;
  dueAt: string | null;
  status: PaymentStatus;
  paidAt: string | null;
};

export type UserActivity = {
  assignments: UserAssignmentSummary[];
  payments: UserPaymentSummary[];
  /** Assignments of an active form's current version that are not yet signed. */
  unsignedCount: number;
  /** Sum of charges still due, in cents. */
  dueCents: number;
  dueCount: number;
};

/** Why a write was refused; the action turns these into copy. */
export type UserWriteError =
  | 'not-found'
  | 'email-taken'
  | 'self'
  | 'last-admin'
  | 'self-demote'
  | 'last-admin-demote';

export type UserWriteResult = { ok: true; id: string } | { ok: false; reason: UserWriteError };

const iso = (d: Date | null | undefined): string | null => (d ? d.toISOString() : null);

function toSummary(row: {
  id: string;
  email: string | null;
  name: string | null;
  familyName: string | null;
  role: Role;
  active: boolean;
  createdAt: Date;
  createdBy: string | null;
}): UserSummary {
  return {
    id: row.id,
    // The column is nullable for the adapter's sake; every row we create has one.
    email: row.email ?? '',
    name: row.name,
    familyName: row.familyName,
    role: row.role,
    active: row.active,
    createdAt: row.createdAt.toISOString(),
    createdBy: row.createdBy,
  };
}

const userColumns = {
  id: users.id,
  email: users.email,
  name: users.name,
  familyName: users.familyName,
  role: users.role,
  active: users.active,
  createdAt: users.createdAt,
  createdBy: users.createdBy,
};

/** Every account: open ones first, then by family name, then email. */
export async function listUsers(): Promise<UserSummary[]> {
  await requireAdmin();
  const rows = await db()
    .select(userColumns)
    .from(users)
    .orderBy(desc(users.active), asc(users.familyName), asc(users.email));
  return rows.map(toSummary);
}

export async function getUser(id: string): Promise<UserSummary | null> {
  await requireAdmin();
  const [row] = await db().select(userColumns).from(users).where(eq(users.id, id)).limit(1);
  return row ? toSummary(row) : null;
}

async function findByEmail(email: string): Promise<{ id: string } | null> {
  const [row] = await db()
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return row ?? null;
}

async function countActiveAdmins(): Promise<number> {
  const [row] = await db()
    .select({ n: count() })
    .from(users)
    .where(and(eq(users.role, 'admin'), eq(users.active, true)));
  return row?.n ?? 0;
}

/** Adds an account. The email is already normalised by the action's schema. */
export async function createUser(input: UserInput): Promise<UserWriteResult> {
  const admin = await requireAdmin();

  if (await findByEmail(input.email)) return { ok: false, reason: 'email-taken' };

  const [row] = await db()
    .insert(users)
    .values({
      email: input.email,
      familyName: input.familyName,
      role: input.role,
      createdBy: admin.id,
    })
    .returning({ id: users.id });

  if (!row) throw new Error('Insert returned no row');
  return { ok: true, id: row.id };
}

/**
 * Changes email, family name or role. The role is the guarded field: a
 * director cannot demote themself, and the last open director cannot be
 * demoted by anyone, or the admin area would have no way back in.
 */
export async function updateUser(id: string, input: UserInput): Promise<UserWriteResult> {
  const admin = await requireAdmin();

  const current = await getUser(id);
  if (!current) return { ok: false, reason: 'not-found' };

  if (input.email !== current.email) {
    const other = await findByEmail(input.email);
    if (other && other.id !== id) return { ok: false, reason: 'email-taken' };
  }

  const demoting = current.role === 'admin' && input.role !== 'admin';
  if (demoting) {
    if (id === admin.id) return { ok: false, reason: 'self-demote' };
    if (current.active && (await countActiveAdmins()) <= 1) {
      return { ok: false, reason: 'last-admin-demote' };
    }
  }

  await db()
    .update(users)
    .set({ email: input.email, familyName: input.familyName, role: input.role })
    .where(eq(users.id, id));

  return { ok: true, id };
}

/**
 * Opens or closes an account. Closing is reversible and deletes nothing;
 * `requireUser()` reads `active` on every request, so it takes effect at the
 * family's next click. You cannot close yourself or the last open director.
 */
export async function setUserActive(id: string, active: boolean): Promise<UserWriteResult> {
  const admin = await requireAdmin();

  const current = await getUser(id);
  if (!current) return { ok: false, reason: 'not-found' };
  if (current.active === active) return { ok: true, id };

  if (!active) {
    if (id === admin.id) return { ok: false, reason: 'self' };
    if (current.role === 'admin' && (await countActiveAdmins()) <= 1) {
      return { ok: false, reason: 'last-admin' };
    }
  }

  await db().update(users).set({ active }).where(eq(users.id, id));
  return { ok: true, id };
}

/**
 * What one family has been asked for: their form assignments and charges,
 * read through the Forms and Payments modules so each has one source, with
 * the two numbers a director wants at a glance.
 */
export async function getUserActivity(userId: string): Promise<UserActivity> {
  await requireAdmin();

  const [assignmentRows, paymentRows] = await Promise.all([
    listAssignmentsForUser(userId),
    listPaymentsFor(userId),
  ]);

  const assignments = assignmentRows.map((a) => ({
    id: a.id,
    formId: a.formId,
    formTitle: a.title,
    formVersion: a.formVersion,
    currentVersion: a.currentVersion,
    formActive: a.formActive,
    assignedAt: a.assignedAt.toISOString(),
    dueAt: iso(a.dueAt),
    signedAt: iso(a.signedAt),
    signerName: a.signerName,
  }));

  const paymentList = paymentRows.map((p) => ({
    id: p.id,
    description: p.description,
    amountCents: p.amountCents,
    dueAt: p.dueAt,
    status: p.status,
    paidAt: p.paidAt,
  }));

  const { dueCount, dueCents } = summarise(paymentRows);
  const unsignedCount = assignments.filter(
    (a) => !a.signedAt && a.formActive && a.formVersion === a.currentVersion,
  ).length;

  return { assignments, payments: paymentList, unsignedCount, dueCents, dueCount };
}
