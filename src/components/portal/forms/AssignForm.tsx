'use client';

import { useActionState, useState } from 'react';

import { adminFormPage } from '@/content/portal-forms';
import type { ActionResult } from '@/lib/action-result';
import type { AssignableUser } from '@/lib/dal/forms';

type Action = (previous: ActionResult | undefined, formData: FormData) => Promise<ActionResult>;

/**
 * Sends the current version to families. "Every active family" is one
 * checkbox; otherwise the director ticks names. The list only holds
 * families without this version, so nothing here can send a copy twice.
 */
export default function AssignForm({
  action,
  candidates,
}: {
  action: Action;
  candidates: AssignableUser[];
}) {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );
  const [all, setAll] = useState(false);
  const errors = state && !state.ok ? (state.errors ?? {}) : {};

  return (
    <form action={formAction} className="portal-form">
      <div className="portal-field portal-field--check">
        <input
          id="assign-all"
          name="all"
          type="checkbox"
          checked={all}
          onChange={(e) => setAll(e.target.checked)}
        />
        <label htmlFor="assign-all">{adminFormPage.assignAllLabel}</label>
      </div>

      <fieldset className="portal-field portal-fieldset" disabled={all}>
        <legend className="eyebrow" id="assign-select-label">
          {adminFormPage.assignSelectLabel}
        </legend>
        <ul aria-labelledby="assign-select-label" className="portal-check-grid">
          {candidates.map((user) => (
            <li key={user.id} className="portal-field portal-field--check">
              <input id={`assign-${user.id}`} name="userIds" type="checkbox" value={user.id} />
              <label htmlFor={`assign-${user.id}`}>
                {user.familyName ?? user.email}
                {user.familyName && user.email ? (
                  <span className="portal-field__hint"> — {user.email}</span>
                ) : null}
              </label>
            </li>
          ))}
        </ul>
        {errors.userIds ? (
          <p className="portal-field__error" role="alert">
            {errors.userIds[0]}
          </p>
        ) : null}
      </fieldset>

      <div className="portal-field portal-field--short">
        <label htmlFor="assign-due">{adminFormPage.dueLabel}</label>
        <input
          id="assign-due"
          name="dueAt"
          type="date"
          aria-invalid={errors.dueAt ? true : undefined}
          aria-describedby={errors.dueAt ? 'assign-due-error' : undefined}
        />
        {errors.dueAt ? (
          <p id="assign-due-error" className="portal-field__error" role="alert">
            {errors.dueAt[0]}
          </p>
        ) : null}
      </div>

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? adminFormPage.assignPending : adminFormPage.assignButton}
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
