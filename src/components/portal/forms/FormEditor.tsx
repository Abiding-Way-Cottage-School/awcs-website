'use client';

import { useActionState } from 'react';

import { formEditor } from '@/content/portal-forms';
import type { ActionResult } from '@/lib/action-result';

type Action = (previous: ActionResult | undefined, formData: FormData) => Promise<ActionResult>;

/**
 * Title and text, for a new form or an existing one. The same component
 * serves both; `mode` only changes the button and whether the current
 * version travels along so the action can say if it made a new one.
 */
export default function FormEditor({
  action,
  mode,
  initial,
}: {
  action: Action;
  mode: 'create' | 'edit';
  initial?: { title: string; body: string; version: number };
}) {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );
  const errors = state && !state.ok ? (state.errors ?? {}) : {};
  const prefix = mode === 'create' ? 'new' : 'edit';

  return (
    <form action={formAction} className="portal-form portal-form--wide">
      {initial ? <input type="hidden" name="version" value={initial.version} /> : null}

      <div className="portal-field">
        <label htmlFor={`${prefix}-title`}>{formEditor.titleLabel}</label>
        <input
          id={`${prefix}-title`}
          name="title"
          type="text"
          required
          maxLength={120}
          defaultValue={initial?.title ?? ''}
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? `${prefix}-title-error` : undefined}
        />
        {errors.title ? (
          <p id={`${prefix}-title-error`} className="portal-field__error" role="alert">
            {errors.title[0]}
          </p>
        ) : null}
      </div>

      <div className="portal-field">
        <label htmlFor={`${prefix}-body`}>{formEditor.bodyLabel}</label>
        <textarea
          id={`${prefix}-body`}
          name="body"
          required
          maxLength={20_000}
          rows={14}
          defaultValue={initial?.body ?? ''}
          aria-invalid={errors.body ? true : undefined}
          aria-describedby={errors.body ? `${prefix}-body-error` : `${prefix}-body-hint`}
        />
        {errors.body ? (
          <p id={`${prefix}-body-error`} className="portal-field__error" role="alert">
            {errors.body[0]}
          </p>
        ) : (
          <p id={`${prefix}-body-hint`} className="portal-field__hint">
            {formEditor.bodyHint}
          </p>
        )}
      </div>

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {mode === 'create'
            ? pending
              ? formEditor.creating
              : formEditor.create
            : pending
              ? formEditor.saving
              : formEditor.save}
        </button>
        {state ? (
          <p role="status" className={state.ok ? 'portal-field__hint' : 'portal-field__error'}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
