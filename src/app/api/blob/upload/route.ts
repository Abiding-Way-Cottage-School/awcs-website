import { issueSignedToken } from '@vercel/blob';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { z } from 'zod';

import {
  UPLOAD_ALLOWED_TYPES,
  UPLOAD_MAX_BYTES,
  isUploadPathname,
  uploadPayloadSchema,
} from '@/components/portal/documents/rules';
import { currentAdminOrNull } from '@/lib/dal';
import { registerUploadedFile } from '@/lib/dal/documents';

export const dynamic = 'force-dynamic';

/**
 * The server half of a browser-to-Blob upload.
 *
 * The browser's `uploadPresigned()` POSTs here twice over: first to ask for
 * a presigned PUT URL, which only a director may have; later Vercel POSTs the
 * upload-completed event, signed with the store's webhook key. That second
 * call carries no session, so it is authenticated by its signature — which
 * `handleUploadPresigned` verifies against BLOB_WEBHOOK_PUBLIC_KEY — and by
 * nothing else.
 *
 * Presigned URLs rather than client tokens because the SDK's `handleUpload`
 * can only sign client tokens with BLOB_READ_WRITE_TOKEN, and this project
 * authenticates to Blob with Vercel OIDC instead. `issueSignedToken` works
 * with either.
 */

/** Ten minutes is plenty to start a 25 MB upload; the URL is single-purpose anyway. */
const TOKEN_LIFETIME_MS = 10 * 60 * 1000;

class UploadRejected extends Error {}

/** What the token carried through Blob and back: the document details plus who asked. */
const tokenPayloadSchema = uploadPayloadSchema.extend({
  createdBy: z.string().max(100).optional(),
});

export async function POST(request: Request): Promise<Response> {
  const admin = await currentAdminOrNull();

  let body: HandleUploadPresignedBody;
  try {
    body = (await request.json()) as HandleUploadPresignedBody;
  } catch {
    return Response.json({ error: 'Expected a JSON body.' }, { status: 400 });
  }

  const isCallback = body?.type === 'blob.upload-completed';
  if (!isCallback && !admin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await handleUploadPresigned({
      body,
      request,

      async getSignedToken(pathname, clientPayload) {
        if (!isUploadPathname(pathname)) {
          throw new UploadRejected('Unexpected upload pathname.');
        }
        const parsed = uploadPayloadSchema.safeParse(parseJson(clientPayload));
        if (!parsed.success) {
          throw new UploadRejected('Missing or invalid document details.');
        }

        const token = await issueSignedToken({
          pathname,
          operations: ['put'],
          allowedContentTypes: UPLOAD_ALLOWED_TYPES,
          maximumSizeInBytes: UPLOAD_MAX_BYTES,
          validUntil: Date.now() + TOKEN_LIFETIME_MS,
        });

        return {
          token,
          urlOptions: {
            addRandomSuffix: true,
            allowOverwrite: false,
            allowedContentTypes: UPLOAD_ALLOWED_TYPES,
            maximumSizeInBytes: UPLOAD_MAX_BYTES,
            tokenPayload: JSON.stringify({ ...parsed.data, createdBy: admin?.id }),
          },
        };
      },

      async onUploadCompleted({ blob, tokenPayload }) {
        const parsed = tokenPayloadSchema.safeParse(parseJson(tokenPayload ?? null));
        if (!parsed.success) {
          console.error('[blob/upload] completion event without a usable payload', blob.pathname);
          return;
        }
        const { createdBy, ...fields } = parsed.data;
        const outcome = await registerUploadedFile({
          blob: { url: blob.url, pathname: blob.pathname, contentType: blob.contentType },
          ...fields,
          createdBy: createdBy ?? null,
        });
        if (!outcome.ok) {
          console.error('[blob/upload] rejected completed upload', blob.pathname, outcome.reason);
        }
      },
    });

    return Response.json(result);
  } catch (error) {
    if (error instanceof UploadRejected) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    console.error('[blob/upload]', error);
    return Response.json({ error: 'Upload could not be prepared.' }, { status: 500 });
  }
}

function parseJson(text: string | null): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}
