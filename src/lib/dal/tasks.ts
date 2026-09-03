import 'server-only';

import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { formAssignments, forms, payments } from '@/db/schema';

import { requireUserFor } from './session';

/**
 * A family's to-do list: forms waiting for a signature and charges still
 * due, in one list sorted by due date (undated last) then by age.
 *
 * Only an assignment for the form's *current* version counts. When a
 * director edits a sent form, the Forms module (`updateForm` in dal/forms)
 * carries every unsigned family forward to the new version in the same
 * call; the old unsigned rows are history.
 *
 * Queries `form_assignments` directly rather than through dal/forms so the
 * two modules stay independent. The list is the family's own, or a director's
 * to read.
 */

export type Task =
  | {
      kind: 'form';
      id: string;
      formId: string;
      title: string;
      href: string;
      dueAt: string | null;
      createdAt: string;
    }
  | {
      kind: 'payment';
      id: string;
      title: string;
      amountCents: number;
      href: string;
      dueAt: string | null;
      createdAt: string;
    };

export async function listTasksFor(userId: string): Promise<Task[]> {
  await requireUserFor(userId);

  const [assignments, charges] = await Promise.all([
    db()
      .select({
        id: formAssignments.id,
        formId: formAssignments.formId,
        title: forms.title,
        dueAt: formAssignments.dueAt,
        assignedAt: formAssignments.assignedAt,
      })
      .from(formAssignments)
      .innerJoin(forms, eq(forms.id, formAssignments.formId))
      .where(
        and(
          eq(formAssignments.userId, userId),
          isNull(formAssignments.signedAt),
          eq(formAssignments.formVersion, forms.version),
          eq(forms.active, true),
        ),
      ),
    db()
      .select({
        id: payments.id,
        description: payments.description,
        amountCents: payments.amountCents,
        dueAt: payments.dueAt,
        createdAt: payments.createdAt,
      })
      .from(payments)
      .where(and(eq(payments.userId, userId), eq(payments.status, 'due'))),
  ]);

  const tasks: Task[] = [
    ...assignments.map(
      (a): Task => ({
        kind: 'form',
        id: a.id,
        formId: a.formId,
        title: a.title,
        href: `/portal/forms/${a.formId}/`,
        dueAt: a.dueAt ? a.dueAt.toISOString() : null,
        createdAt: a.assignedAt.toISOString(),
      }),
    ),
    ...charges.map(
      (c): Task => ({
        kind: 'payment',
        id: c.id,
        title: c.description,
        amountCents: c.amountCents,
        href: '/portal/#payments',
        dueAt: c.dueAt ? c.dueAt.toISOString() : null,
        createdAt: c.createdAt.toISOString(),
      }),
    ),
  ];

  return tasks.sort(byDueThenAge);
}

function byDueThenAge(a: Task, b: Task): number {
  if (a.dueAt && b.dueAt && a.dueAt !== b.dueAt) return a.dueAt < b.dueAt ? -1 : 1;
  if (a.dueAt && !b.dueAt) return -1;
  if (!a.dueAt && b.dueAt) return 1;
  return a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
}
