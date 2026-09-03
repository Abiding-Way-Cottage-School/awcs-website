import 'server-only';

import { createHash } from 'node:crypto';

import { BlobNotFoundError, del } from '@vercel/blob';
import { asc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { documents, type DocumentKind } from '@/db/schema';
import { documentFileHref, isStoredUploadPathname } from '@/components/portal/documents/rules';

import { currentUserOrNull, requireAdmin, requireUser } from './session';

/**
 * Documents: the files and links on the families' Resources page.
 *
 * A file's blob URL never leaves this module. The DTO carries a portal href
 * instead — `/api/documents/[id]/file/` — and the route handler behind it
 * streams the private blob after checking the session. Links carry their
 * external URL as the href.
 *
 * Every function checks who is asking. The one the download route calls uses
 * the null-returning check so a fetch gets a 401, not a redirect; the one
 * exception is `registerUploadedFile`, which the Blob webhook calls with no
 * session at all — its route authenticates that call by signature.
 */

export type DocumentDto = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  kind: DocumentKind;
  /** Where the browser opens it: the portal file route, or the link's own address. */
  href: string;
  filename: string | null;
  contentType: string | null;
  sizeBytes: number | null;
  sortOrder: number;
  visible: boolean;
  /** ISO 8601. */
  createdAt: string;
};

export type DocumentGroup = { category: string; documents: DocumentDto[] };

// ---- Reading -----------------------------------------------------------------

const dtoColumns = {
  id: documents.id,
  title: documents.title,
  description: documents.description,
  category: documents.category,
  kind: documents.kind,
  url: documents.url,
  filename: documents.filename,
  contentType: documents.contentType,
  sizeBytes: documents.sizeBytes,
  sortOrder: documents.sortOrder,
  visible: documents.visible,
  createdAt: documents.createdAt,
};

type DtoSource = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  kind: DocumentKind;
  url: string;
  filename: string | null;
  contentType: string | null;
  sizeBytes: number | null;
  sortOrder: number;
  visible: boolean;
  createdAt: Date;
};

function toDto(row: DtoSource): DocumentDto {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    kind: row.kind,
    href: row.kind === 'file' ? documentFileHref(row.id) : row.url,
    filename: row.filename,
    contentType: row.contentType,
    sizeBytes: row.sizeBytes,
    sortOrder: row.sortOrder,
    visible: row.visible,
    createdAt: row.createdAt.toISOString(),
  };
}

const ordering = [asc(documents.category), asc(documents.sortOrder), asc(documents.title)];

/** Every document for directors, or only the visible ones for families. */
export async function listDocuments({ visibleOnly }: { visibleOnly: boolean }): Promise<DocumentDto[]> {
  if (visibleOnly) await requireUser();
  else await requireAdmin();

  const query = db().select(dtoColumns).from(documents);
  const rows = visibleOnly
    ? await query.where(eq(documents.visible, true)).orderBy(...ordering)
    : await query.orderBy(...ordering);
  return rows.map(toDto);
}

/** Categories in the order the list arrives, so callers can group a sorted list. */
export function groupByCategory(list: DocumentDto[]): DocumentGroup[] {
  const groups = new Map<string, DocumentDto[]>();
  for (const doc of list) {
    const bucket = groups.get(doc.category);
    if (bucket) bucket.push(doc);
    else groups.set(doc.category, [doc]);
  }
  return [...groups].map(([category, docs]) => ({ category, documents: docs }));
}

export async function getDocument(id: string): Promise<DocumentDto | null> {
  await requireAdmin();

  const [row] = await db().select(dtoColumns).from(documents).where(eq(documents.id, id)).limit(1);
  return row ? toDto(row) : null;
}

/** Distinct categories, for the form's suggestions. */
export async function listCategories(): Promise<string[]> {
  await requireAdmin();

  const rows = await db()
    .selectDistinct({ category: documents.category })
    .from(documents)
    .orderBy(asc(documents.category));
  return rows.map((r) => r.category);
}

export type DocumentFile = {
  kind: DocumentKind;
  visible: boolean;
  blobPathname: string | null;
  filename: string | null;
  contentType: string | null;
};

/** What the download route needs and nothing more; null to anyone not signed in. */
export async function getDocumentFile(id: string): Promise<DocumentFile | null> {
  if (!(await currentUserOrNull())) return null;

  const [row] = await db()
    .select({
      kind: documents.kind,
      visible: documents.visible,
      blobPathname: documents.blobPathname,
      filename: documents.filename,
      contentType: documents.contentType,
    })
    .from(documents)
    .where(eq(documents.id, id))
    .limit(1);
  return row ?? null;
}

// ---- Writing -----------------------------------------------------------------

export type LinkDocumentInput = {
  title: string;
  description?: string;
  category: string;
  url: string;
};

export async function createLinkDocument(input: LinkDocumentInput, createdBy: string): Promise<string> {
  await requireAdmin();

  const [row] = await db()
    .insert(documents)
    .values({
      title: input.title,
      description: input.description || null,
      category: input.category,
      kind: 'link',
      url: input.url,
      createdBy,
    })
    .returning({ id: documents.id });
  return row!.id;
}

/**
 * A file document's id is derived from its blob pathname, which Blob makes
 * unique with a random suffix. Two arrivals of the same upload — the
 * completion webhook and the browser's own call — therefore insert the same
 * primary key, and the second is a no-op rather than a duplicate.
 */
export function documentIdForBlob(pathname: string): string {
  const hex = createHash('sha256').update(pathname).digest('hex').slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export type UploadedBlob = { url: string; pathname: string; contentType: string };

export type RegisterFileInput = {
  blob: UploadedBlob;
  title: string;
  description?: string;
  category: string;
  filename: string;
  sizeBytes: number;
  createdBy: string | null;
};

export type RegisterFileResult =
  | { ok: true; id: string; created: boolean }
  | { ok: false; reason: 'not-private' | 'bad-pathname' };

/**
 * Records a finished upload. A blob that is not private, or that landed
 * outside `documents/`, is deleted rather than recorded: the browser chose
 * the access level and the pathname, so neither is trusted.
 *
 * No session check here, on purpose: the upload route calls this from the
 * Blob webhook, which carries no cookie and is authenticated by its
 * signature. The action path (`createFileDocument`) checks the director first.
 */
export async function registerUploadedFile(input: RegisterFileInput): Promise<RegisterFileResult> {
  const { blob } = input;

  if (!blob.url.includes('.private.')) {
    await removeBlobQuietly(blob.url);
    return { ok: false, reason: 'not-private' };
  }
  if (!isStoredUploadPathname(blob.pathname)) {
    await removeBlobQuietly(blob.url);
    return { ok: false, reason: 'bad-pathname' };
  }

  const id = documentIdForBlob(blob.pathname);
  const inserted = await db()
    .insert(documents)
    .values({
      id,
      title: input.title,
      description: input.description || null,
      category: input.category,
      kind: 'file',
      url: blob.url,
      blobPathname: blob.pathname,
      filename: input.filename,
      contentType: blob.contentType,
      sizeBytes: input.sizeBytes,
      createdBy: input.createdBy,
    })
    .onConflictDoNothing({ target: documents.id })
    .returning({ id: documents.id });

  return { ok: true, id, created: inserted.length > 0 };
}

export type DocumentPatch = {
  title: string;
  description?: string;
  category: string;
  sortOrder?: number;
  visible: boolean;
  /** Applied to links only; ignored for files. */
  url?: string;
};

export async function updateDocument(id: string, patch: DocumentPatch): Promise<boolean> {
  await requireAdmin();

  const [current] = await db()
    .select({ kind: documents.kind })
    .from(documents)
    .where(eq(documents.id, id))
    .limit(1);
  if (!current) return false;

  const updated = await db()
    .update(documents)
    .set({
      title: patch.title,
      description: patch.description || null,
      category: patch.category,
      sortOrder: patch.sortOrder ?? 0,
      visible: patch.visible,
      ...(current.kind === 'link' && patch.url ? { url: patch.url } : {}),
    })
    .where(eq(documents.id, id))
    .returning({ id: documents.id });
  return updated.length > 0;
}

export async function setDocumentVisible(id: string, visible: boolean): Promise<boolean> {
  await requireAdmin();

  const updated = await db()
    .update(documents)
    .set({ visible })
    .where(eq(documents.id, id))
    .returning({ id: documents.id });
  return updated.length > 0;
}

/**
 * Removes the row and, for files, the blob. The blob goes first: a row whose
 * file is gone shows up as a 404 a director can delete again, whereas a blob
 * whose row is gone is storage nobody can see or reclaim.
 */
export async function deleteDocument(id: string): Promise<'deleted' | 'missing'> {
  await requireAdmin();

  const [row] = await db()
    .select({ kind: documents.kind, url: documents.url, blobPathname: documents.blobPathname })
    .from(documents)
    .where(eq(documents.id, id))
    .limit(1);
  if (!row) return 'missing';

  if (row.kind === 'file') {
    await removeBlob(row.blobPathname ?? row.url);
  }
  await db().delete(documents).where(eq(documents.id, id));
  return 'deleted';
}

/** Deletes a blob; one that is already gone counts as deleted. */
async function removeBlob(urlOrPathname: string): Promise<void> {
  try {
    await del(urlOrPathname);
  } catch (error) {
    if (error instanceof BlobNotFoundError) return;
    throw error;
  }
}

/** For cleaning up a rejected upload, where failing to delete must not mask the rejection. */
async function removeBlobQuietly(urlOrPathname: string): Promise<void> {
  try {
    await removeBlob(urlOrPathname);
  } catch (error) {
    console.error('[documents] could not delete rejected blob', urlOrPathname, error);
  }
}
