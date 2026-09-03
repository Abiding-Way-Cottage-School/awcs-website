import 'server-only';

import {
  and,
  asc,
  count,
  desc,
  eq,
  gt,
  inArray,
  isNull,
  lt,
  notExists,
  notInArray,
  or,
  sql,
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import { formAssignments, forms, users } from '@/db/schema';

import { requireAdmin, requireUserFor } from './session';

/**
 * Forms and their assignments.
 *
 * Every function here checks who is asking — `requireAdmin()` for the
 * directors' functions, the family's own id for theirs — and hands back
 * DTOs shaped for one page, never a raw row. React caches the session and
 * the user row, so the page's own check and this one cost one query.
 *
 * Versioning: a form's `version` climbs by one every time its text is saved
 * after it has been sent to anyone. An assignment remembers the version it
 * was sent for, so a family who signed version 1 keeps that signature when
 * version 2 appears, and a family who has not signed is sent the new version
 * the moment it is saved (see `updateForm`) — the unique index on
 * (form, user, version) makes "send" safe to repeat.
 */

export type FormSummary = {
  id: string;
  title: string;
  version: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  /** Families holding the current version. */
  assigned: number;
  /** Of those, how many have signed. */
  signed: number;
};

export type FormDetail = {
  id: string;
  title: string;
  body: string;
  version: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};

export type AssignmentSummary = {
  id: string;
  userId: string;
  familyName: string | null;
  email: string | null;
  formVersion: number;
  /** True when `formVersion` is the form's current version. */
  current: boolean;
  assignedAt: Date;
  dueAt: Date | null;
  signedAt: Date | null;
  signerName: string | null;
};

export type AssignableUser = {
  id: string;
  familyName: string | null;
  email: string | null;
};

/** One family's assignment of one form, for the User detail page. */
export type UserAssignment = {
  id: string;
  formId: string;
  title: string;
  formVersion: number;
  currentVersion: number;
  formActive: boolean;
  assignedAt: Date;
  dueAt: Date | null;
  signedAt: Date | null;
  signerName: string | null;
};

export type FamilyFormView = {
  assignmentId: string;
  formId: string;
  title: string;
  /** The current text, or the snapshot once signed. */
  body: string;
  version: number;
  dueAt: Date | null;
  signedAt: Date | null;
  signerName: string | null;
  /** Why it cannot be signed, if it cannot. */
  blocked: 'signed' | 'retired' | 'superseded' | null;
};

// ---- Directors ---------------------------------------------------------------

export async function listForms(): Promise<FormSummary[]> {
  await requireAdmin();

  const rows = await db()
    .select({
      id: forms.id,
      title: forms.title,
      version: forms.version,
      active: forms.active,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
      assigned: count(formAssignments.id),
      signed: count(formAssignments.signedAt),
    })
    .from(forms)
    .leftJoin(
      formAssignments,
      and(eq(formAssignments.formId, forms.id), eq(formAssignments.formVersion, forms.version)),
    )
    .groupBy(forms.id)
    .orderBy(desc(forms.active), desc(forms.createdAt));

  return rows;
}

export async function getForm(id: string): Promise<FormDetail | null> {
  await requireAdmin();

  const [row] = await db()
    .select({
      id: forms.id,
      title: forms.title,
      body: forms.body,
      version: forms.version,
      active: forms.active,
      createdAt: forms.createdAt,
      updatedAt: forms.updatedAt,
    })
    .from(forms)
    .where(eq(forms.id, id))
    .limit(1);
  return row ?? null;
}

export async function createForm(input: {
  title: string;
  body: string;
  createdBy: string;
}): Promise<{ id: string }> {
  await requireAdmin();

  const [row] = await db()
    .insert(forms)
    .values({ title: input.title, body: input.body, createdBy: input.createdBy })
    .returning({ id: forms.id });
  if (!row) throw new Error('Insert returned no row.');
  return row;
}

/**
 * Saves new text. One statement decides the version: it climbs only if the
 * form has ever been sent to anyone, so a draft can be polished freely.
 *
 * When it climbs, every family whose newest copy is still unsigned is sent
 * the new version at once, keeping their due date, so nothing drops off
 * their home page. Families who signed keep their signature and are not
 * asked again; a family a director removed from the last version is not
 * brought back. If nothing was ever sent, the version stands still and the
 * carry-forward finds nobody, so it is safe to run after every save. The
 * unique index on (form, user, version) makes it safe to repeat.
 *
 * Returns the version after the save, or null if the form is gone.
 */
export async function updateForm(
  id: string,
  input: { title: string; body: string; updatedBy: string },
): Promise<{ version: number } | null> {
  await requireAdmin();

  const [row] = await db()
    .update(forms)
    .set({
      title: input.title,
      body: input.body,
      updatedAt: new Date(),
      version: sql`${forms.version} + (case when exists (select 1 from ${formAssignments} where ${formAssignments.formId} = ${forms.id}) then 1 else 0 end)`,
    })
    .where(eq(forms.id, id))
    .returning({ version: forms.version });
  if (!row) return null;

  await carryForwardUnsigned(id, row.version, input.updatedBy);
  return row;
}

/**
 * INSERT … SELECT of a fresh assignment for each family whose newest copy of
 * the form is older than `version` and unsigned. Drizzle renders the full
 * column list for an insert-from-select, so the selection names every
 * column of `form_assignments` in schema order.
 */
async function carryForwardUnsigned(formId: string, version: number, assignedBy: string) {
  const newer = alias(formAssignments, 'newer');

  await db()
    .insert(formAssignments)
    .select(
      db()
        .select({
          id: sql`gen_random_uuid()::text`.as('id'),
          formId: formAssignments.formId,
          userId: formAssignments.userId,
          assignedAt: sql`now()`.as('assigned_at'),
          assignedBy: sql`${assignedBy}::text`.as('assigned_by'),
          dueAt: formAssignments.dueAt,
          signedAt: sql`null::timestamptz`.as('signed_at'),
          signerName: sql`null::text`.as('signer_name'),
          signerIp: sql`null::text`.as('signer_ip'),
          signerUserAgent: sql`null::text`.as('signer_user_agent'),
          formVersion: sql`${version}::integer`.as('form_version'),
          formBodySnapshot: sql`null::text`.as('form_body_snapshot'),
        })
        .from(formAssignments)
        .innerJoin(users, eq(users.id, formAssignments.userId))
        .where(
          and(
            eq(formAssignments.formId, formId),
            lt(formAssignments.formVersion, version),
            isNull(formAssignments.signedAt),
            eq(users.active, true),
            eq(users.role, 'family'),
            notExists(
              db()
                .select({ id: newer.id })
                .from(newer)
                .where(
                  and(
                    eq(newer.formId, formAssignments.formId),
                    eq(newer.userId, formAssignments.userId),
                    gt(newer.formVersion, formAssignments.formVersion),
                  ),
                ),
            ),
          ),
        ),
    )
    .onConflictDoNothing({
      target: [formAssignments.formId, formAssignments.userId, formAssignments.formVersion],
    });
}

export async function setFormActive(id: string, active: boolean): Promise<boolean> {
  await requireAdmin();

  const rows = await db()
    .update(forms)
    .set({ active, updatedAt: new Date() })
    .where(eq(forms.id, id))
    .returning({ id: forms.id });
  return rows.length > 0;
}

/** Every assignment of a form, newest version first, then by family. */
export async function listAssignmentsForForm(formId: string): Promise<AssignmentSummary[]> {
  await requireAdmin();

  const rows = await db()
    .select({
      id: formAssignments.id,
      userId: formAssignments.userId,
      familyName: users.familyName,
      email: users.email,
      formVersion: formAssignments.formVersion,
      currentVersion: forms.version,
      assignedAt: formAssignments.assignedAt,
      dueAt: formAssignments.dueAt,
      signedAt: formAssignments.signedAt,
      signerName: formAssignments.signerName,
    })
    .from(formAssignments)
    .innerJoin(users, eq(users.id, formAssignments.userId))
    .innerJoin(forms, eq(forms.id, formAssignments.formId))
    .where(eq(formAssignments.formId, formId))
    .orderBy(desc(formAssignments.formVersion), asc(users.familyName), asc(users.email));

  return rows.map(({ currentVersion, ...row }) => ({
    ...row,
    current: row.formVersion === currentVersion,
  }));
}

/** Active family accounts that do not yet hold the form's current version. */
export async function listAssignableUsers(formId: string): Promise<AssignableUser[]> {
  await requireAdmin();

  const form = await getForm(formId);
  if (!form) return [];

  const held = db()
    .select({ userId: formAssignments.userId })
    .from(formAssignments)
    .where(and(eq(formAssignments.formId, formId), eq(formAssignments.formVersion, form.version)));

  return db()
    .select({ id: users.id, familyName: users.familyName, email: users.email })
    .from(users)
    .where(
      and(eq(users.active, true), eq(users.role, 'family'), notInArray(users.id, held)),
    )
    .orderBy(asc(users.familyName), asc(users.email));
}

/** How many active family accounts exist at all (for the empty state). */
export async function countActiveFamilies(): Promise<number> {
  await requireAdmin();

  const [row] = await db()
    .select({ n: count() })
    .from(users)
    .where(and(eq(users.active, true), eq(users.role, 'family')));
  return row?.n ?? 0;
}

/**
 * Sends the current version to the chosen families, or to every active
 * family. One insert, and the unique index quietly drops anyone who already
 * holds this version — signed or not — so nothing is ever sent twice.
 * Returns how many new assignments were made, or null if the form is gone.
 */
export async function assignForm(input: {
  formId: string;
  userIds: string[] | 'all';
  dueAt: Date | null;
  assignedBy: string;
}): Promise<{ assigned: number } | null> {
  await requireAdmin();

  const form = await getForm(input.formId);
  if (!form) return null;

  const eligible = and(eq(users.active, true), eq(users.role, 'family'));
  const targets = await db()
    .select({ id: users.id })
    .from(users)
    .where(
      input.userIds === 'all'
        ? eligible
        : input.userIds.length === 0
          ? sql`false`
          : and(eligible, inArray(users.id, input.userIds)),
    );

  if (targets.length === 0) return { assigned: 0 };

  const inserted = await db()
    .insert(formAssignments)
    .values(
      targets.map((t) => ({
        formId: form.id,
        userId: t.id,
        formVersion: form.version,
        dueAt: input.dueAt,
        assignedBy: input.assignedBy,
      })),
    )
    .onConflictDoNothing({
      target: [formAssignments.formId, formAssignments.userId, formAssignments.formVersion],
    })
    .returning({ id: formAssignments.id });

  return { assigned: inserted.length };
}

/** Removes an unsigned assignment. A signed one is a record and stays. */
export async function removeAssignment(
  assignmentId: string,
): Promise<'removed' | 'signed' | 'missing'> {
  await requireAdmin();

  const [existing] = await db()
    .select({ signedAt: formAssignments.signedAt })
    .from(formAssignments)
    .where(eq(formAssignments.id, assignmentId))
    .limit(1);
  if (!existing) return 'missing';
  if (existing.signedAt) return 'signed';

  const rows = await db()
    .delete(formAssignments)
    .where(and(eq(formAssignments.id, assignmentId), isNull(formAssignments.signedAt)))
    .returning({ id: formAssignments.id });
  return rows.length > 0 ? 'removed' : 'signed';
}

/** One family's forms, newest first — for the User detail page. */
export async function listAssignmentsForUser(userId: string): Promise<UserAssignment[]> {
  await requireAdmin();

  return db()
    .select({
      id: formAssignments.id,
      formId: formAssignments.formId,
      title: forms.title,
      formVersion: formAssignments.formVersion,
      currentVersion: forms.version,
      formActive: forms.active,
      assignedAt: formAssignments.assignedAt,
      dueAt: formAssignments.dueAt,
      signedAt: formAssignments.signedAt,
      signerName: formAssignments.signerName,
    })
    .from(formAssignments)
    .innerJoin(forms, eq(forms.id, formAssignments.formId))
    .where(eq(formAssignments.userId, userId))
    .orderBy(desc(formAssignments.assignedAt));
}

// ---- Families ----------------------------------------------------------------

/**
 * The form behind /portal/forms/[id]/ for the signed-in family. The id may
 * be an assignment id or a form id — the home page links one way, an old
 * email might link the other — and either resolves to that family's newest
 * copy of the form. Nobody else's copy is reachable from here.
 */
export async function getFamilyForm(id: string, userId: string): Promise<FamilyFormView | null> {
  await requireUserFor(userId);

  const [row] = await db()
    .select({
      assignmentId: formAssignments.id,
      formId: forms.id,
      title: forms.title,
      currentBody: forms.body,
      currentVersion: forms.version,
      active: forms.active,
      formVersion: formAssignments.formVersion,
      dueAt: formAssignments.dueAt,
      signedAt: formAssignments.signedAt,
      signerName: formAssignments.signerName,
      snapshot: formAssignments.formBodySnapshot,
    })
    .from(formAssignments)
    .innerJoin(forms, eq(forms.id, formAssignments.formId))
    .where(
      and(
        eq(formAssignments.userId, userId),
        or(eq(formAssignments.id, id), eq(forms.id, id)),
      ),
    )
    .orderBy(desc(formAssignments.formVersion), desc(formAssignments.assignedAt))
    .limit(1);
  if (!row) return null;

  const signed = row.signedAt !== null;
  const blocked = signed
    ? 'signed'
    : !row.active
      ? 'retired'
      : row.formVersion !== row.currentVersion
        ? 'superseded'
        : null;

  return {
    assignmentId: row.assignmentId,
    formId: row.formId,
    title: row.title,
    body: signed && row.snapshot !== null ? row.snapshot : row.currentBody,
    version: signed ? row.formVersion : row.currentVersion,
    dueAt: row.dueAt,
    signedAt: row.signedAt,
    signerName: row.signerName,
    blocked,
  };
}

export type SignOutcome = 'signed' | 'missing' | 'already-signed' | 'retired' | 'superseded';

/**
 * Records a signature against the family's own, unsigned assignment. Only an
 * assignment for the form's current version can be signed — the same rule
 * `getFamilyForm` uses to decide whether to show the signing form — and
 * because any edit of a sent form bumps the version, a matching version
 * guarantees `forms.body` is the text that was on the screen. That text is
 * what goes into the record.
 */
export async function signAssignment(input: {
  assignmentId: string;
  userId: string;
  signerName: string;
  ip: string | null;
  userAgent: string | null;
}): Promise<SignOutcome> {
  await requireUserFor(input.userId);

  const [row] = await db()
    .select({
      body: forms.body,
      currentVersion: forms.version,
      active: forms.active,
      formVersion: formAssignments.formVersion,
      signedAt: formAssignments.signedAt,
    })
    .from(formAssignments)
    .innerJoin(forms, eq(forms.id, formAssignments.formId))
    .where(and(eq(formAssignments.id, input.assignmentId), eq(formAssignments.userId, input.userId)))
    .limit(1);

  if (!row) return 'missing';
  if (row.signedAt) return 'already-signed';
  if (!row.active) return 'retired';

  if (row.formVersion !== row.currentVersion) return 'superseded';

  const updated = await db()
    .update(formAssignments)
    .set({
      signedAt: new Date(),
      signerName: input.signerName,
      signerIp: input.ip,
      signerUserAgent: input.userAgent,
      formBodySnapshot: row.body,
    })
    .where(
      and(
        eq(formAssignments.id, input.assignmentId),
        eq(formAssignments.userId, input.userId),
        isNull(formAssignments.signedAt),
      ),
    )
    .returning({ id: formAssignments.id });

  return updated.length > 0 ? 'signed' : 'already-signed';
}
