'use client';

import { useActionState, useState } from 'react';

import { settlePayment } from '@/app/admin/payments/actions';
import { adminPayments } from '@/content/portal-payments';
import type { ActionResult } from '@/lib/action-result';

const copy = adminPayments.actions;

type Mode = 'idle' | 'paid' | 'waived' | 'delete';

/**
 * Mark paid, waive or delete — each a two-step: choose, then confirm. The
 * confirm form posts one intent; the page re-renders from the server, so
 * a settled row simply comes back with no actions to offer.
 */
export default function PaymentRowActions({ paymentId }: { paymentId: string }) {
  const [mode, setMode] = useState<Mode>('idle');
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    settlePayment.bind(null, paymentId),
    undefined,
  );

  if (mode === 'idle') {
    return (
      <div className="portal-table__actions">
        <button type="button" className="portal-link-button" onClick={() => setMode('paid')}>
          {copy.markPaid}
        </button>
        <button type="button" className="portal-link-button" onClick={() => setMode('waived')}>
          {copy.waive}
        </button>
        <button type="button" className="portal-link-button" onClick={() => setMode('delete')}>
          {copy.delete}
        </button>
        {state && !state.ok ? (
          <p className="portal-field__error" role="alert">
            {state.message}
          </p>
        ) : null}
      </div>
    );
  }

  const noteId = `note-${paymentId}`;
  const warning = mode === 'delete' ? copy.deleteWarning : mode === 'waived' ? copy.waiveWarning : null;
  const confirmLabel =
    mode === 'paid' ? copy.confirmPaid : mode === 'waived' ? copy.confirmWaive : copy.confirmDelete;

  return (
    <form action={formAction} className="portal-row-form">
      {warning ? <p className="portal-field__hint">{warning}</p> : null}

      {mode !== 'delete' ? (
        <div className="portal-field">
          <label htmlFor={noteId}>{copy.note}</label>
          <input id={noteId} name="note" type="text" maxLength={200} aria-describedby={`${noteId}-hint`} />
          <p id={`${noteId}-hint`} className="portal-field__hint">
            {copy.noteHint}
          </p>
        </div>
      ) : null}

      <div className="portal-actions">
        <button
          type="submit"
          name="intent"
          value={mode}
          className="btn btn-primary portal-btn--small"
          disabled={pending}
        >
          {pending ? copy.pending : confirmLabel}
        </button>
        <button
          type="button"
          className="portal-link-button"
          onClick={() => setMode('idle')}
          disabled={pending}
        >
          {copy.cancel}
        </button>
      </div>

      {state && !state.ok ? (
        <p className="portal-field__error" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
