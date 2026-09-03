'use client';

import { useActionState, useState } from 'react';

import { adminFormPage } from '@/content/portal-forms';
import type { ActionResult } from '@/lib/action-result';

type Action = (previous: ActionResult | undefined, formData: FormData) => Promise<ActionResult>;

/**
 * A quiet button that asks once before it acts. The first click only shows
 * the question; the second submits the bound action. Anything the action
 * returns is shown beside it.
 */
export default function ConfirmButton({
  action,
  label,
  question,
  size = 'normal',
}: {
  action: Action;
  label: string;
  question: string;
  size?: 'normal' | 'small';
}) {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );
  const [armed, setArmed] = useState(false);

  const small = size === 'small' ? ' portal-btn--small' : '';

  if (!armed) {
    return (
      <div className="portal-actions">
        <button type="button" className={`btn btn-ghost${small}`} onClick={() => setArmed(true)}>
          {label}
        </button>
        {state && !state.ok ? (
          <p role="alert" className="portal-field__error">
            {state.message}
          </p>
        ) : null}
        {state?.ok && state.message ? (
          <p role="status" className="portal-field__hint">
            {state.message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form action={formAction} className="portal-actions">
      <p className="portal-field__hint">{question}</p>
      <button type="submit" className={`btn btn-primary${small}`} disabled={pending}>
        {adminFormPage.confirmYes}
      </button>
      <button
        type="button"
        className={`btn btn-ghost${small}`}
        onClick={() => setArmed(false)}
        disabled={pending}
      >
        {adminFormPage.confirmNo}
      </button>
    </form>
  );
}
