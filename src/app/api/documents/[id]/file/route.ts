import { get } from '@vercel/blob';
import type { NextRequest } from 'next/server';

import { currentUserOrNull } from '@/lib/dal';
import { getDocumentFile } from '@/lib/dal/documents';

export const dynamic = 'force-dynamic';

/**
 * Streams a file document to a signed-in family.
 *
 * Private blobs have no browser-fetchable URL, so this is the only way in:
 * the session is checked, the row is loaded, and the blob is read with the
 * server's credentials and piped through. Hidden documents are a 404 to
 * families and open to directors, who need to check what they have hidden.
 * `?download=1` asks the browser to save rather than display.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const user = await currentUserOrNull();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = await params;
  const file = await getDocumentFile(id);
  if (!file || file.kind !== 'file' || !file.blobPathname) {
    return new Response('Not found', { status: 404 });
  }
  if (!file.visible && user.role !== 'admin') {
    return new Response('Not found', { status: 404 });
  }

  const ifNoneMatch = request.headers.get('if-none-match') ?? undefined;
  const result = await get(file.blobPathname, { access: 'private', ifNoneMatch });
  if (!result) {
    return new Response('Not found', { status: 404 });
  }

  if (result.statusCode === 304) {
    return new Response(null, {
      status: 304,
      headers: { etag: result.blob.etag, 'cache-control': 'private, no-store' },
    });
  }

  const filename = file.filename || file.blobPathname.split('/').pop() || 'document';
  const disposition = request.nextUrl.searchParams.get('download') === '1' ? 'attachment' : 'inline';

  return new Response(result.stream, {
    status: 200,
    headers: {
      'content-type': file.contentType || result.blob.contentType || 'application/octet-stream',
      'content-length': String(result.blob.size),
      etag: result.blob.etag,
      'cache-control': 'private, no-store',
      'content-disposition': contentDisposition(disposition, filename),
      'x-content-type-options': 'nosniff',
    },
  });
}

/** RFC 6266: an ASCII fallback plus the UTF-8 form for names with other characters. */
function contentDisposition(type: 'inline' | 'attachment', filename: string): string {
  const ascii = filename.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
  const utf8 = encodeURIComponent(filename).replace(
    /['()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `${type}; filename="${ascii}"; filename*=UTF-8''${utf8}`;
}
