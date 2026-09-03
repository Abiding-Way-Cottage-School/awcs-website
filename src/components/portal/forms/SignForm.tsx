'use client';

import { useActionState } from 'react';

import { familyFormPage } from '@/content/portal-forms';
import type { ActionResult } from '@/lib/action-result';

type Action = (previous: ActionResult | undefined, formData: FormData) => Promise<ActionResult>;

/** Typed name, one checkbox, one button. The action is bound to the assignment. */
export default function SignForm({ action }: { action: Action }) {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );
  const errors = state && !state.ok ? (state.errors ?? {}) : {};
  const general = state && !state.ok && !state.errors ? state.message : null;

  return (
    <form action={formAction} className="portal-form">
      <div className="portal-field">
        <label htmlFor="signerName">{familyFormPage.nameLabel}</label>
        <input
          id="signerName"
          name="signerName"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={errors.signerName ? true : undefined}
          aria-describedby={errors.signerName ? 'signerName-error' : 'signerName-hint'}
        />
        {errors.signerName ? (
          <p id="signerName-error" className="portal-field__error" role="alert">
            {errors.signerName[0]}
          </p>
        ) : (
          <p id="signerName-hint" className="portal-field__hint">
            {familyFormPage.nameHint}
          </p>
        )}
      </div>

      <div className="portal-field portal-field--check">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          required
          aria-invalid={errors.agree ? true : undefined}
          aria-describedby={errors.agree ? 'agree-error' : undefined}
        />
        <label htmlFor="agree">{familyFormPage.agreeLabel}</label>
      </div>
      {errors.agree ? (
        <p id="agree-error" className="portal-field__error" role="alert">
          {errors.agree[0]}
        </p>
      ) : null}

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? familyFormPage.pending : familyFormPage.button}
        </button>
        {general ? (
          <p role="alert" className="portal-field__error">
            {general}
          </p>
        ) : null}
      </div>

      <p className="portal-field__hint">{familyFormPage.record}</p>
    </form>
  );
}
