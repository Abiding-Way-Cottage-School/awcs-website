'use client';

import { useActionState } from 'react';

import { createUserAction } from '@/app/admin/users/actions';
import { userForm } from '@/content/portal-users';
import type { ActionResult } from '@/lib/action-result';

import UserFields from './UserFields';

/** Adds an account. On success the action redirects to the new detail page. */
export default function NewUserForm() {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    createUserAction,
    undefined,
  );
  const failed = state !== undefined && !state.ok;

  return (
    <form action={formAction} className="portal-form">
      <UserFields idPrefix="new-user" state={state} />

      {failed && !state.errors ? (
        <p className="portal-field__error" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? userForm.pendingAdd : userForm.submitAdd}
        </button>
      </div>
    </form>
  );
}
