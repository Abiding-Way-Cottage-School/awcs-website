import { z } from 'zod';

import { blankToUndefined, documentBaseSchema } from '@/lib/validation';

/**
 * What an uploaded file may be, shared by the browser (pre-flight checks and
 * the clientPayload), the upload route (the signed token's constraints) and
 * the action that records the finished upload. No server-only code here: the
 * client component imports it too.
 */

export const UPLOAD_MAX_BYTES = 25 * 1024 * 1024;

export const UPLOAD_ALLOWED_TYPES = [
  'application/pdf',
  'image/*',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

/** The `accept` attribute for the file input: the same list, plus extensions for pickers that key on them. */
export const UPLOAD_ACCEPT = [...UPLOAD_ALLOWED_TYPES, '.pdf', '.doc', '.docx', '.txt'].join(',');

export const UPLOAD_PATH_PREFIX = 'documents/';

/** The route that mints presigned upload URLs; the trailing slash matches `trailingSlash: true`. */
export const HANDLE_UPLOAD_URL = '/api/blob/upload/';

/** Where a family downloads a file document; the route handler checks the session. */
export function documentFileHref(id: string): string {
  return `/api/documents/${encodeURIComponent(id)}/file/`;
}

export function isAllowedContentType(type: string): boolean {
  if (!type) return false;
  const [group] = type.split('/');
  return UPLOAD_ALLOWED_TYPES.includes(type) || UPLOAD_ALLOWED_TYPES.includes(`${group}/*`);
}

/**
 * The blob pathname for a chosen file: the prefix, a slug of the name, the
 * extension. Blob adds a random suffix before the extension so two uploads of
 * "handbook.pdf" never collide.
 */
export function uploadPathname(filename: string): string {
  const base = filename.replace(/\\/g, '/').split('/').pop() ?? '';
  const dot = base.lastIndexOf('.');
  const stem = dot > 0 ? base.slice(0, dot) : base;
  const ext = dot > 0 ? base.slice(dot + 1) : '';
  const slug =
    stem
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase()
      .slice(0, 80)
      .replace(/^-+|-+$/g, '') || 'file';
  const safeExt = ext.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 10);
  return `${UPLOAD_PATH_PREFIX}${slug}${safeExt ? `.${safeExt}` : ''}`;
}

/** Only pathnames `uploadPathname()` could have produced are signed. */
export function isUploadPathname(pathname: string): boolean {
  return /^documents\/[a-z0-9][a-z0-9-]{0,79}(\.[a-z0-9]{1,10})?$/.test(pathname);
}

/**
 * Where a finished upload may sit: the prefix, then the signed pathname with
 * Blob's random suffix. Looser than `isUploadPathname` on purpose — the token
 * already pinned the pathname, and the suffix's exact shape is Blob's.
 */
export function isStoredUploadPathname(pathname: string): boolean {
  return /^documents\/[A-Za-z0-9][A-Za-z0-9._-]{0,200}$/.test(pathname) && !pathname.includes('..');
}

/** Sent by the browser as `clientPayload`, echoed back inside the signed token. */
export const uploadPayloadSchema = documentBaseSchema.extend({
  filename: z.string().trim().min(1).max(255),
  sizeBytes: z.number().int().min(1).max(UPLOAD_MAX_BYTES),
});

export type UploadPayload = z.infer<typeof uploadPayloadSchema>;

/** What the browser hands `createFileDocument` once Blob has the file. */
export const fileDocumentInputSchema = uploadPayloadSchema.extend({
  url: z.url(),
  pathname: z.string().max(300),
  contentType: z.string().max(200),
});

export type FileDocumentInput = z.infer<typeof fileDocumentInputSchema>;

/** Form fields for editing any document; the URL only matters for links and is checked separately. */
export const documentEditSchema = documentBaseSchema.extend({
  sortOrder: z.preprocess(
    blankToUndefined,
    z.coerce
      .number({ error: 'Enter a whole number.' })
      .int({ error: 'Enter a whole number.' })
      .min(-1000, { error: 'Keep the order between -1000 and 1000.' })
      .max(1000, { error: 'Keep the order between -1000 and 1000.' })
      .optional(),
  ),
  visible: z.preprocess((value) => value === 'on' || value === 'true' || value === true, z.boolean()),
});

export function formatBytes(bytes: number | null): string | null {
  if (bytes === null || !Number.isFinite(bytes)) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

/** A short label for the table and the Resources page: "PDF", "Image", "Word", "Text". */
export function contentTypeLabel(contentType: string | null): string | null {
  if (!contentType) return null;
  if (contentType === 'application/pdf') return 'PDF';
  if (contentType.startsWith('image/')) return 'Image';
  if (contentType === 'text/plain') return 'Text';
  if (contentType === 'application/msword' || contentType.includes('wordprocessingml')) return 'Word';
  return null;
}
