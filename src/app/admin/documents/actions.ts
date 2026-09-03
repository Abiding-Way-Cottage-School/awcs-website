'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { documentEditSchema, fileDocumentInputSchema } from '@/components/portal/documents/rules';
import { adminDocumentsPage as copy } from '@/content/portal-documents';
import { fail, succeed, type ActionResult } from '@/lib/action-result';
import { requireAdmin } from '@/lib/dal';
import {
  createLinkDocument,
  deleteDocument as deleteDocumentRow,
  registerUploadedFile,
  setDocumentVisible,
  updateDocument as updateDocumentRow,
} from '@/lib/dal/documents';
import { documentSchema, fieldErrors, httpsUrlSchema, stripActionKeys } from '@/lib/validation';

const ADMIN_PATH = '/admin/documents';
const FAMILY_PATH = '/portal/resources';

function revalidateDocuments(): void {
  revalidatePath(ADMIN_PATH);
  revalidatePath(FAMILY_PATH);
}

/** Adds an external link to the Resources page. */
export async function createLink(
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireAdmin();

  const parsed = documentSchema.safeParse({ kind: 'link', ...stripActionKeys(formData) });
  if (!parsed.success) {
    return fail(copy.errors.invalid, fieldErrors(parsed.error));
  }
  if (parsed.data.kind !== 'link') {
    return fail(copy.errors.invalid);
  }

  await createLinkDocument(
    {
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      url: parsed.data.url,
    },
    admin.id,
  );

  revalidateDocuments();
  redirect(`${ADMIN_PATH}/?saved=1`);
}

/**
 * Records a file the browser has just put in Blob. The completion webhook
 * records it too when it fires (it does not on localhost); the two agree on
 * the row's id, so whichever arrives second changes nothing.
 */
export async function createFileDocument(input: unknown): Promise<ActionResult> {
  const admin = await requireAdmin();

  const parsed = fileDocumentInputSchema.safeParse(input);
  if (!parsed.success) {
    return fail(copy.errors.invalid, fieldErrors(parsed.error));
  }
  const { url, pathname, contentType, ...fields } = parsed.data;

  const result = await registerUploadedFile({
    blob: { url, pathname, contentType },
    ...fields,
    createdBy: admin.id,
  });
  if (!result.ok) {
    return fail(result.reason === 'not-private' ? copy.errors.notPrivate : copy.errors.badPathname);
  }

  revalidateDocuments();
  return succeed(copy.notices.uploaded);
}

/** Edits title, description, category, order, visibility — and the address, for links. */
export async function updateDocument(
  id: string,
  _previous: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const raw = stripActionKeys(formData);
  const parsed = documentEditSchema.safeParse(raw);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);

  // Only links carry an address; the field is absent from a file's form.
  let url: string | undefined;
  if ('url' in raw) {
    const parsedUrl = httpsUrlSchema.safeParse(raw.url);
    if (parsedUrl.success) url = parsedUrl.data;
    else errors.url = parsedUrl.error.issues.map((issue) => issue.message);
  }

  if (!parsed.success || Object.keys(errors).length > 0) {
    return fail(copy.errors.invalid, errors);
  }

  const found = await updateDocumentRow(id, { ...parsed.data, url });
  if (!found) {
    return fail(copy.errors.missing);
  }

  revalidateDocuments();
  redirect(`${ADMIN_PATH}/?updated=1`);
}

/** Hides or shows a document on the Resources page; a one-button form in the table. */
export async function setVisibility(id: string, visible: boolean, _formData?: FormData): Promise<void> {
  await requireAdmin();

  const found = await setDocumentVisible(id, visible);

  revalidateDocuments();
  redirect(found ? `${ADMIN_PATH}/` : `${ADMIN_PATH}/?missing=1`);
}

/** The second step of deleting: the page has already asked "are you sure?". */
export async function deleteDocument(id: string, _formData?: FormData): Promise<void> {
  await requireAdmin();

  const outcome = await deleteDocumentRow(id);

  revalidateDocuments();
  redirect(outcome === 'deleted' ? `${ADMIN_PATH}/?deleted=1` : `${ADMIN_PATH}/?missing=1`);
}
