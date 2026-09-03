'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { adminFormsMessages, formEditor } from '@/content/portal-forms';
import { fail, succeed, type ActionResult } from '@/lib/action-result';
import { requireAdmin } from '@/lib/dal';
import {
  assignForm as assignFormRows,
  createForm as insertForm,
  removeAssignment as deleteAssignment,
  setFormActive,
  updateForm as saveForm,
} from '@/lib/dal/forms';
import {
  fieldErrors,
  formSchema,
  idSchema,
  optionalDueDateSchema,
  stripActionKeys,
} from '@/lib/validation';

/**
 * The directors' form actions. Each one checks the caller first, validates
 * the shape of what arrived, and only then touches the database. Ids arrive
 * bound from the page, never as trusted objects.
 */

function revalidateForm(formId: string) {
  revalidatePath('/admin/forms');
  revalidatePath(`/admin/forms/${formId}`);
  // The family's copy and their task list read the same rows.
  revalidatePath('/portal');
  revalidatePath('/portal/(app)/forms/[id]', 'page');
}

export async function createForm(
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();

  const parsed = formSchema.safeParse(stripActionKeys(formData));
  if (!parsed.success) {
    return fail(adminFormsMessages.invalid, fieldErrors(parsed.error));
  }

  const { id } = await insertForm({ ...parsed.data, createdBy: admin.id });

  revalidatePath('/admin/forms');
  redirect(`/admin/forms/${id}/`);
}

export async function updateForm(
  formId: string,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();

  const id = idSchema.safeParse(formId);
  if (!id.success) return fail(adminFormsMessages.notFound);

  const parsed = formSchema.safeParse(stripActionKeys(formData));
  if (!parsed.success) {
    return fail(adminFormsMessages.invalid, fieldErrors(parsed.error));
  }

  const before = formData.get('version');
  const result = await saveForm(id.data, { ...parsed.data, updatedBy: admin.id });
  if (!result) return fail(adminFormsMessages.notFound);

  revalidateForm(id.data);

  const bumped = typeof before === 'string' && Number(before) !== result.version;
  return succeed(bumped ? formEditor.savedNewVersion(result.version) : formEditor.savedSame);
}

const assignSchema = z.object({
  all: z.boolean(),
  userIds: z.array(idSchema).max(500),
  dueAt: optionalDueDateSchema,
});

/** A calendar date becomes noon UTC, which reads as that date in Florida. */
function dueDate(iso: string | undefined): Date | null {
  return iso ? new Date(`${iso}T12:00:00Z`) : null;
}

export async function assignForm(
  formId: string,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();

  const id = idSchema.safeParse(formId);
  if (!id.success) return fail(adminFormsMessages.notFound);

  const parsed = assignSchema.safeParse({
    all: formData.get('all') === 'on',
    userIds: formData.getAll('userIds').filter((v): v is string => typeof v === 'string'),
    dueAt: formData.get('dueAt'),
  });
  if (!parsed.success) {
    return fail(adminFormsMessages.invalid, fieldErrors(parsed.error));
  }

  const { all, userIds, dueAt } = parsed.data;
  if (!all && userIds.length === 0) {
    return fail(adminFormsMessages.chooseFamilies, { userIds: [adminFormsMessages.chooseFamilies] });
  }

  const result = await assignFormRows({
    formId: id.data,
    userIds: all ? 'all' : userIds,
    dueAt: dueDate(dueAt),
    assignedBy: admin.id,
  });
  if (!result) return fail(adminFormsMessages.notFound);

  revalidateForm(id.data);
  return succeed(adminFormsMessages.assigned(result.assigned));
}

export async function removeAssignment(
  formId: string,
  assignmentId: string,
  _previous: ActionResult | undefined,
  _formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const ids = z.tuple([idSchema, idSchema]).safeParse([formId, assignmentId]);
  if (!ids.success) return fail(adminFormsMessages.notFound);

  const outcome = await deleteAssignment(ids.data[1]);
  if (outcome === 'signed') return fail(adminFormsMessages.removeSigned);

  revalidateForm(ids.data[0]);
  return succeed(adminFormsMessages.removed);
}

export async function retireForm(
  formId: string,
  _previous: ActionResult | undefined,
  _formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const id = idSchema.safeParse(formId);
  if (!id.success) return fail(adminFormsMessages.notFound);

  const found = await setFormActive(id.data, false);
  if (!found) return fail(adminFormsMessages.notFound);

  revalidateForm(id.data);
  return succeed(adminFormsMessages.retired);
}

export async function restoreForm(
  formId: string,
  _previous: ActionResult | undefined,
  _formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const id = idSchema.safeParse(formId);
  if (!id.success) return fail(adminFormsMessages.notFound);

  const found = await setFormActive(id.data, true);
  if (!found) return fail(adminFormsMessages.notFound);

  revalidateForm(id.data);
  return succeed(adminFormsMessages.restored);
}
