'use client';

import { uploadPresigned } from '@vercel/blob/client';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';

import { createFileDocument } from '@/app/admin/documents/actions';
import { adminDocumentsPage as copy } from '@/content/portal-documents';
import { fieldErrors } from '@/lib/validation';

import CategoryField from './CategoryField';
import {
  HANDLE_UPLOAD_URL,
  UPLOAD_ACCEPT,
  UPLOAD_MAX_BYTES,
  isAllowedContentType,
  uploadPathname,
  uploadPayloadSchema,
} from './rules';

/**
 * Sends a file straight from the browser to Vercel Blob, then tells the
 * server about it. The file never passes through a server action, whose
 * body is capped at 1 MB; only its details do.
 *
 * Not a progressively enhanced form: without JavaScript there is no way to
 * hand the browser a presigned URL, so the button is inert until hydration.
 */
export default function UploadForm({ categories }: { categories: string[] }) {
  const router = useRouter();
  const idPrefix = useId();
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get('file');

    const nextErrors: Record<string, string[]> = {};
    if (!(file instanceof File) || file.size === 0) {
      nextErrors.file = [copy.errors.noFile];
    } else if (!isAllowedContentType(file.type)) {
      nextErrors.file = [copy.errors.fileType];
    } else if (file.size > UPLOAD_MAX_BYTES) {
      nextErrors.file = [copy.errors.fileSize];
    }

    const parsed = uploadPayloadSchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      filename: file instanceof File ? file.name : '',
      sizeBytes: file instanceof File ? file.size : 0,
    });
    if (!parsed.success) {
      Object.assign(nextErrors, fieldErrors(parsed.error));
    }

    if (Object.keys(nextErrors).length > 0 || !parsed.success || !(file instanceof File)) {
      setErrors(nextErrors);
      setMessage(copy.errors.invalid);
      return;
    }

    setErrors({});
    setMessage(null);
    setPending(true);
    setProgress(0);

    try {
      const blob = await uploadPresigned(uploadPathname(file.name), file, {
        access: 'private',
        contentType: file.type,
        handleUploadUrl: HANDLE_UPLOAD_URL,
        clientPayload: JSON.stringify(parsed.data),
        onUploadProgress: (event) => setProgress(Math.round(event.percentage)),
      });

      const result = await createFileDocument({
        ...parsed.data,
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType,
      });
      if (!result.ok) {
        setMessage(result.message);
        if (result.errors) setErrors(result.errors);
        return;
      }

      form.reset();
      router.push('/admin/documents/?uploaded=1');
    } catch (error) {
      setMessage(describe(error));
    } finally {
      setPending(false);
      setProgress(null);
    }
  }

  const id = (name: string) => `${idPrefix}-${name}`;
  const errorFor = (name: string) => errors[name]?.[0];

  return (
    <form onSubmit={handleSubmit} className="portal-form" noValidate>
      <div className="portal-field">
        <label htmlFor={id('file')}>{copy.fields.file}</label>
        <input
          id={id('file')}
          name="file"
          type="file"
          accept={UPLOAD_ACCEPT}
          required
          aria-describedby={errorFor('file') ? id('file-error') : id('file-hint')}
        />
        {errorFor('file') ? (
          <p id={id('file-error')} className="portal-field__error" role="alert">
            {errorFor('file')}
          </p>
        ) : (
          <p id={id('file-hint')} className="portal-field__hint">
            {copy.fields.fileHint}
          </p>
        )}
      </div>

      <div className="portal-field">
        <label htmlFor={id('title')}>{copy.fields.title}</label>
        <input id={id('title')} name="title" type="text" maxLength={120} required />
        {errorFor('title') ? (
          <p className="portal-field__error" role="alert">
            {errorFor('title')}
          </p>
        ) : null}
      </div>

      <CategoryField id={id('category')} categories={categories} error={errorFor('category')} />

      <div className="portal-field">
        <label htmlFor={id('description')}>{copy.fields.description}</label>
        <input id={id('description')} name="description" type="text" maxLength={500} />
        {errorFor('description') ? (
          <p className="portal-field__error" role="alert">
            {errorFor('description')}
          </p>
        ) : (
          <p className="portal-field__hint">{copy.fields.descriptionHint}</p>
        )}
      </div>

      {message ? (
        <p className="portal-field__error" role="alert">
          {message}
        </p>
      ) : null}

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? copy.buttons.uploading : copy.buttons.upload}
        </button>
        {pending && progress !== null ? (
          <span className="portal-field__hint" role="status" aria-live="polite">
            {copy.progress(progress)}
          </span>
        ) : null}
      </div>
    </form>
  );
}

/** Blob's own messages are useful to a director ("content type not allowed"); anything else gets the plain one. */
function describe(error: unknown): string {
  if (error instanceof Error && error.message.startsWith('Vercel Blob: ')) {
    const detail = error.message.slice('Vercel Blob: '.length);
    if (/retrieve the presigned URL/i.test(detail)) return copy.errors.unauthorized;
    return `${copy.errors.uploadFailed} (${detail})`;
  }
  return copy.errors.uploadFailed;
}
