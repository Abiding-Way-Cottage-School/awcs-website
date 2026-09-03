'use client';

import { useActionState, useId } from 'react';

import { createLink } from '@/app/admin/documents/actions';
import { adminDocumentsPage as copy } from '@/content/portal-documents';
import type { ActionResult } from '@/lib/action-result';

import CategoryField from './CategoryField';

/** Adds an external link. On success the action redirects, so there is no success state to render. */
export default function LinkForm({ categories }: { categories: string[] }) {
  const idPrefix = useId();
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    createLink,
    undefined,
  );
  const errors = state && !state.ok ? (state.errors ?? {}) : {};
  const id = (name: string) => `${idPrefix}-${name}`;
  const errorFor = (name: string) => errors[name]?.[0];

  return (
    <form action={formAction} className="portal-form">
      <div className="portal-field">
        <label htmlFor={id('title')}>{copy.fields.title}</label>
        <input id={id('title')} name="title" type="text" maxLength={120} required />
        {errorFor('title') ? (
          <p className="portal-field__error" role="alert">
            {errorFor('title')}
          </p>
        ) : null}
      </div>

      <div className="portal-field">
        <label htmlFor={id('url')}>{copy.fields.url}</label>
        <input
          id={id('url')}
          name="url"
          type="url"
          inputMode="url"
          placeholder="https://"
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

      {state && !state.ok ? (
        <p className="portal-field__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? copy.buttons.saving : copy.buttons.addLink}
        </button>
      </div>
    </form>
  );
}
