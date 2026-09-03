'use client';

import { useActionState } from 'react';

import { updateUserAction } from '@/app/admin/users/actions';
import { userForm } from '@/content/portal-users';
import type { Role } from '@/db/schema';
import type { ActionResult } from '@/lib/action-result';

import UserFields from './UserFields';

/**
 * Edits one account in place. The id travels with `bind`, not a hidden
 * input, so the form still works before hydration.
 */
export default function EditUserForm({
  user,
}: {
  user: { id: string; email: string; familyName: string | null; role: Role };
}) {
  const action = updateUserAction.bind(null, user.id);
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    action,
    undefined,
  );

  return (
    <form action={formAction} className="portal-form">
      <UserFields
        idPrefix={`user-${user.id}`}
        state={state}
        defaults={{ email: user.email, familyName: user.familyName ?? '', role: user.role }}
      />

      {state && !state.ok && !state.errors ? (
        <p className="portal-field__error" role="alert">
          {state.message}
        </p>
      ) : null}
      {state?.ok && state.message ? (
        <p className="portal-field__hint" role="status">
          {state.message}
        </p>
      ) : null}

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? userForm.pendingSave : userForm.submitSave}
        </button>
      </div>
    </form>
  );
}
