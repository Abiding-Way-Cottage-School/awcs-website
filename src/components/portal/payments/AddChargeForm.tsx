'use client';

import { useActionState } from 'react';

import { addCharge } from '@/app/admin/payments/actions';
import { adminPayments } from '@/content/portal-payments';
import type { ActionResult } from '@/lib/action-result';
import type { FamilyOption } from '@/lib/dal/payments';

const copy = adminPayments.add;

/**
 * One charge, to one family or to all of them. React resets the fields
 * after a successful submit; the message below the button says what
 * happened.
 */
export default function AddChargeForm({ families }: { families: FamilyOption[] }) {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    addCharge,
    undefined,
  );
  const errors = state && !state.ok ? (state.errors ?? {}) : {};
  const fieldError = (name: string) => errors[name]?.[0];

  if (families.length === 0) {
    return <p className="portal-empty">{copy.noFamilies}</p>;
  }

  return (
    <form action={formAction} className="portal-form">
      <div className="portal-field">
        <label htmlFor="charge-recipient">{copy.recipient}</label>
        <select
          id="charge-recipient"
          name="recipient"
          required
          defaultValue=""
          aria-describedby={fieldError('recipient') ? 'charge-recipient-error' : undefined}
        >
          <option value="" disabled>
            {copy.recipientPlaceholder}
          </option>
          <option value="all">{copy.everyone}</option>
          {families.map((family) => (
            <option key={family.id} value={family.id}>
              {family.familyName ? `${family.familyName} — ${family.email}` : family.email}
            </option>
          ))}
        </select>
        {fieldError('recipient') ? (
          <p id="charge-recipient-error" className="portal-field__error" role="alert">
            {fieldError('recipient')}
          </p>
        ) : null}
      </div>

      <div className="portal-field">
        <label htmlFor="charge-description">{copy.description}</label>
        <input
          id="charge-description"
          name="description"
          type="text"
          required
          maxLength={160}
          aria-describedby={
            fieldError('description') ? 'charge-description-error' : 'charge-description-hint'
          }
        />
        {fieldError('description') ? (
          <p id="charge-description-error" className="portal-field__error" role="alert">
            {fieldError('description')}
          </p>
        ) : (
          <p id="charge-description-hint" className="portal-field__hint">
            {copy.descriptionHint}
          </p>
        )}
      </div>

      <div className="portal-field">
        <label htmlFor="charge-amount">{copy.amount}</label>
        <input
          id="charge-amount"
          name="amount"
          type="text"
          inputMode="decimal"
          required
          placeholder="0.00"
          aria-describedby={fieldError('amountCents') ? 'charge-amount-error' : 'charge-amount-hint'}
        />
        {fieldError('amountCents') ? (
          <p id="charge-amount-error" className="portal-field__error" role="alert">
            {fieldError('amountCents')}
          </p>
        ) : (
          <p id="charge-amount-hint" className="portal-field__hint">
            {copy.amountHint}
          </p>
        )}
      </div>

      <div className="portal-field">
        <label htmlFor="charge-due">{copy.dueAt}</label>
        <input
          id="charge-due"
          name="dueAt"
          type="date"
          aria-describedby={fieldError('dueAt') ? 'charge-due-error' : 'charge-due-hint'}
        />
        {fieldError('dueAt') ? (
          <p id="charge-due-error" className="portal-field__error" role="alert">
            {fieldError('dueAt')}
          </p>
        ) : (
          <p id="charge-due-hint" className="portal-field__hint">
            {copy.dueAtHint}
          </p>
        )}
      </div>

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? copy.pending : copy.button}
        </button>
        {state ? (
          <p className={state.ok ? 'portal-field__hint' : 'portal-field__error'} role="status">
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
