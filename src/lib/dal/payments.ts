import 'server-only';

import { and, asc, desc, eq, sql } from 'drizzle-orm';

import { db } from '@/db';
import { payments, users, type PaymentStatus } from '@/db/schema';

import { requireAdmin, requireUserFor } from './session';

/**
 * Charges: what a family owes the co-op, and what it has settled.
 *
 * Every function returns plain DTOs with dates as ISO strings, never rows —
 * the shapes here are what pages and client components may see. Each one
 * checks who is asking: the directors' functions need a director, and a
 * family's own list is theirs or a director's to read.
 */

export type PaymentDTO = {
  id: string;
  userId: string;
  familyName: string | null;
  email: string;
  description: string;
  amountCents: number;
  /** ISO date-time of the day it is due (midnight UTC), or null. */
  dueAt: string | null;
  status: PaymentStatus;
  /** When a director marked it paid. Stays null for waived charges. */
  paidAt: string | null;
  method: string | null;
  note: string | null;
  createdAt: string;
};

export type PaymentSummary = {
  dueCount: number;
  dueCents: number;
  paidCents: number;
};

export type FamilyOption = {
  id: string;
  familyName: string | null;
  email: string;
};

export type ChargeInput = {
  description: string;
  amountCents: number;
  /** ISO date `YYYY-MM-DD`, or undefined for no due date. */
  dueAt?: string;
};

export type PaymentFilter = 'unpaid' | 'all';

const selection = {
  id: payments.id,
  userId: payments.userId,
  familyName: users.familyName,
  email: users.email,
  description: payments.description,
  amountCents: payments.amountCents,
  dueAt: payments.dueAt,
  status: payments.status,
  paidAt: payments.paidAt,
  method: payments.method,
  note: payments.note,
  createdAt: payments.createdAt,
};

type Selected = {
  id: string;
  userId: string;
  familyName: string | null;
  email: string | null;
  description: string;
  amountCents: number;
  dueAt: Date | null;
  status: PaymentStatus;
  paidAt: Date | null;
  method: string | null;
  note: string | null;
  createdAt: Date;
};

function toDto(row: Selected): PaymentDTO {
  return {
    id: row.id,
    userId: row.userId,
    familyName: row.familyName,
    email: row.email ?? '',
    description: row.description,
    amountCents: row.amountCents,
    dueAt: row.dueAt ? row.dueAt.toISOString() : null,
    status: row.status,
    paidAt: row.paidAt ? row.paidAt.toISOString() : null,
    method: row.method,
    note: row.note,
    createdAt: row.createdAt.toISOString(),
  };
}

/** A `YYYY-MM-DD` due date becomes midnight UTC on that day. */
function dueDate(iso: string | undefined): Date | null {
  return iso ? new Date(`${iso}T00:00:00.000Z`) : null;
}

const dueFirst = [sql`${payments.dueAt} asc nulls last`, asc(payments.createdAt)];

/** Every charge for the directors' list, unpaid ones first by due date. */
export async function listPayments(filter: PaymentFilter): Promise<PaymentDTO[]> {
  await requireAdmin();

  const rows = await db()
    .select(selection)
    .from(payments)
    .innerJoin(users, eq(users.id, payments.userId))
    .where(filter === 'unpaid' ? eq(payments.status, 'due') : undefined)
    .orderBy(...(filter === 'unpaid' ? dueFirst : [desc(payments.createdAt)]));
  return rows.map(toDto);
}

/** One family's charges, due ones first by due date, then the rest newest first. */
export async function listPaymentsFor(userId: string): Promise<PaymentDTO[]> {
  await requireUserFor(userId);

  const rows = await db()
    .select(selection)
    .from(payments)
    .innerJoin(users, eq(users.id, payments.userId))
    .where(eq(payments.userId, userId))
    .orderBy(
      sql`case when ${payments.status} = 'due' then 0 else 1 end`,
      sql`${payments.dueAt} asc nulls last`,
      desc(payments.createdAt),
    );
  return rows.map(toDto);
}

/** Counts and totals for one family, for a user's detail page. */
export async function paymentSummaryFor(userId: string): Promise<PaymentSummary> {
  await requireUserFor(userId);

  const rows = await db()
    .select({ status: payments.status, amountCents: payments.amountCents })
    .from(payments)
    .where(eq(payments.userId, userId));
  return summarise(rows);
}

/** Totals over a list already in hand, so a page does not query twice. */
export function summarise(
  items: ReadonlyArray<{ status: PaymentStatus; amountCents: number }>,
): PaymentSummary {
  let dueCount = 0;
  let dueCents = 0;
  let paidCents = 0;
  for (const item of items) {
    if (item.status === 'due') {
      dueCount += 1;
      dueCents += item.amountCents;
    } else if (item.status === 'paid') {
      paidCents += item.amountCents;
    }
  }
  return { dueCount, dueCents, paidCents };
}

/** Active family accounts, for the "charge to" list. Directors are not charged. */
export async function listActiveFamilies(): Promise<FamilyOption[]> {
  await requireAdmin();

  const rows = await db()
    .select({ id: users.id, familyName: users.familyName, email: users.email })
    .from(users)
    .where(and(eq(users.active, true), eq(users.role, 'family')))
    .orderBy(asc(users.familyName), asc(users.email));
  return rows.map((row) => ({ id: row.id, familyName: row.familyName, email: row.email ?? '' }));
}

/** One active family by id, or null — the check behind the "charge to" select. */
export async function getActiveFamily(userId: string): Promise<FamilyOption | null> {
  await requireAdmin();

  const [row] = await db()
    .select({ id: users.id, familyName: users.familyName, email: users.email })
    .from(users)
    .where(and(eq(users.id, userId), eq(users.active, true), eq(users.role, 'family')))
    .limit(1);
  return row ? { id: row.id, familyName: row.familyName, email: row.email ?? '' } : null;
}

export async function createCharge(
  userId: string,
  input: ChargeInput,
  createdBy: string,
): Promise<{ id: string }> {
  await requireAdmin();

  const [row] = await db()
    .insert(payments)
    .values({
      userId,
      description: input.description,
      amountCents: input.amountCents,
      dueAt: dueDate(input.dueAt),
      createdBy,
    })
    .returning({ id: payments.id });
  if (!row) throw new Error('Insert returned no row.');
  return row;
}

/**
 * The same charge for every active family, in one atomic batch: either every
 * family is charged or none is. Returns how many rows were written.
 */
export async function createChargeForAllActiveFamilies(
  input: ChargeInput,
  createdBy: string,
): Promise<number> {
  await requireAdmin();

  const families = await listActiveFamilies();
  if (families.length === 0) return 0;

  const due = dueDate(input.dueAt);
  const inserts = families.map((family) =>
    db().insert(payments).values({
      userId: family.id,
      description: input.description,
      amountCents: input.amountCents,
      dueAt: due,
      createdBy,
    }),
  );
  const [first, ...rest] = inserts;
  if (!first) return 0;
  await db().batch([first, ...rest]);
  return families.length;
}

/**
 * Settles a due charge. Only a due charge can change state, so two
 * directors acting on the same row cannot both "win": the second sees
 * false and the list refreshes under them.
 */
export async function markPaid(
  paymentId: string,
  markedBy: string,
  note: string | undefined,
): Promise<boolean> {
  await requireAdmin();

  const rows = await db()
    .update(payments)
    .set({
      status: 'paid',
      paidAt: new Date(),
      markedBy,
      method: 'venmo',
      ...(note === undefined ? {} : { note }),
    })
    .where(and(eq(payments.id, paymentId), eq(payments.status, 'due')))
    .returning({ id: payments.id });
  return rows.length > 0;
}

export async function waivePayment(
  paymentId: string,
  markedBy: string,
  note: string | undefined,
): Promise<boolean> {
  await requireAdmin();

  const rows = await db()
    .update(payments)
    .set({
      status: 'waived',
      markedBy,
      ...(note === undefined ? {} : { note }),
    })
    .where(and(eq(payments.id, paymentId), eq(payments.status, 'due')))
    .returning({ id: payments.id });
  return rows.length > 0;
}

/** Removes a charge nobody has paid. Settled charges are the record and stay. */
export async function deleteUnpaidPayment(paymentId: string): Promise<boolean> {
  await requireAdmin();

  const rows = await db()
    .delete(payments)
    .where(and(eq(payments.id, paymentId), eq(payments.status, 'due')))
    .returning({ id: payments.id });
  return rows.length > 0;
}
