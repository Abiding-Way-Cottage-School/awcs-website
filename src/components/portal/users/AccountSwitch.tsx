'use client';

import { useActionState, useState } from 'react';

import { setUserActiveAction } from '@/app/admin/users/actions';
import { accountSwitch } from '@/content/portal-users';
import type { ActionResult } from '@/lib/action-result';

/**
 * Opens or closes an account. Closing asks first: the button reveals a
 * question, and only the "yes" form carries the `confirm` field the action
 * insists on. When the change lands and `active` flips, the question folds
 * away again — without remounting, so the action's message stays on screen.
 */
export default function AccountSwitch({
  userId,
  active,
  isSelf,
}: {
  userId: string;
  active: boolean;
  isSelf: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const [seenActive, setSeenActive] = useState(active);
  if (seenActive !== active) {
    setSeenActive(active);
    setConfirming(false);
  }

  const action = setUserActiveAction.bind(null, userId, !active);
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );

  const message =
    state === undefined ? null : (
      <p className={state.ok ? 'portal-field__hint' : 'portal-field__error'} role={state.ok ? 'status' : 'alert'}>
        {state.message}
      </p>
    );

  if (!active) {
    return (
      <form action={formAction} className="portal-form">
        <p className="portal-field__hint">{accountSwitch.inactiveNote}</p>
        {message}
        <div className="portal-actions">
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? accountSwitch.pending : accountSwitch.reactivate}
          </button>
        </div>
      </form>
    );
  }

  if (isSelf) {
    return (
      <div className="portal-form">
        <p className="portal-field__hint">{accountSwitch.activeNote}</p>
        <p className="portal-field__hint">{accountSwitch.isSelf}</p>
      </div>
    );
  }

  if (!confirming) {
    return (
      <div className="portal-form">
        <p className="portal-field__hint">{accountSwitch.activeNote}</p>
        {message}
        <div className="portal-actions">
          <button type="button" className="btn btn-ghost" onClick={() => setConfirming(true)}>
            {accountSwitch.deactivate}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="portal-form">
      <input type="hidden" name="confirm" value="yes" />
      <p className="portal-notice" role="status">
        {accountSwitch.confirmPrompt}
      </p>
      {message}
      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? accountSwitch.pending : accountSwitch.confirm}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setConfirming(false)}
          disabled={pending}
        >
          {accountSwitch.cancel}
        </button>
      </div>
    </form>
  );
}
