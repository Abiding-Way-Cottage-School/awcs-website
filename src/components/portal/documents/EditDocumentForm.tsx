'use client';

import Link from 'next/link';
import { useActionState, useId } from 'react';

import { updateDocument } from '@/app/admin/documents/actions';
import { adminDocumentsPage as copy } from '@/content/portal-documents';
import type { ActionResult } from '@/lib/action-result';

import CategoryField from './CategoryField';

/** The editable face of a document; files keep their file, links keep an editable address. */
export type EditableDocument = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  kind: 'file' | 'link';
  url: string | null;
  filename: string | null;
  sortOrder: number;
  visible: boolean;
};

export default function EditDocumentForm({
  document,
  categories,
}: {
  document: EditableDocument;
  categories: string[];
}) {
  const idPrefix = useId();
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    updateDocument.bind(null, document.id),
    undefined,
  );
  const errors = state && !state.ok ? (state.errors ?? {}) : {};
  const id = (name: string) => `${idPrefix}-${name}`;
  const errorFor = (name: string) => errors[name]?.[0];

  return (
    <form action={formAction} className="portal-form">
      <div className="portal-field">
        <label htmlFor={id('title')}>{copy.fields.title}</label>
        <input
          id={id('title')}
          name="title"
          type="text"
          maxLength={120}
          defaultValue={document.title}
          required
        />
        {errorFor('title') ? (
          <p className="portal-field__error" role="alert">
            {errorFor('title')}
          </p>
        ) : null}
      </div>

      {document.kind === 'link' ? (
        <div className="portal-field">
          <label htmlFor={id('url')}>{copy.fields.url}</label>
          <input
            id={id('url')}
            name="url"
            type="url"
            inputMode="url"
            defaultValue={document.url ?? ''}
            required
          />
          {errorFor('url') ? (
            <p className="portal-field__error" role="alert">
              {errorFor('url')}
            </p>
          ) : (
            <p className="portal-field__hint">{copy.fields.urlHint}</p>
          )}
        </div>
      ) : (
        <div className="portal-field">
          <span className="portal-field__hint">
            {copy.fields.file}: {document.filename ?? '—'}
          </span>
        </div>
      )}

      <CategoryField
        id={id('category')}
        categories={categories}
        defaultValue={document.category}
        error={errorFor('category')}
      />

      <div className="portal-field">
        <label htmlFor={id('description')}>{copy.fields.description}</label>
        <input
          id={id('description')}
          name="description"
          type="text"
          maxLength={500}
          defaultValue={document.description ?? ''}
        />
        {errorFor('description') ? (
          <p className="portal-field__error" role="alert">
            {errorFor('description')}
          </p>
        ) : (
          <p className="portal-field__hint">{copy.fields.descriptionHint}</p>
        )}
      </div>

      <div className="portal-field">
        <label htmlFor={id('sortOrder')}>{copy.fields.sortOrder}</label>
        <input
          id={id('sortOrder')}
          name="sortOrder"
          type="number"
          inputMode="numeric"
          step={1}
          min={-1000}
          max={1000}
          defaultValue={document.sortOrder}
        />
        {errorFor('sortOrder') ? (
          <p className="portal-field__error" role="alert">
            {errorFor('sortOrder')}
          </p>
        ) : (
          <p className="portal-field__hint">{copy.fields.sortOrderHint}</p>
        )}
      </div>

      <div className="portal-field portal-field--check">
        <input id={id('visible')} name="visible" type="checkbox" defaultChecked={document.visible} />
        <label htmlFor={id('visible')}>{copy.fields.visible}</label>
      </div>

      {state && !state.ok ? (
        <p className="portal-field__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? copy.buttons.saving : copy.buttons.save}
        </button>
        <Link href="/admin/documents/" className="btn btn-ghost">
          {copy.actions.cancel}
        </Link>
      </div>
    </form>
  );
}
