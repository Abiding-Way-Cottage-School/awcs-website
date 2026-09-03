'use client';

import { useActionState } from 'react';

import { signInPage } from '@/content/portal';
import type { ActionResult } from '@/lib/action-result';

import { signInWithEmail } from './actions';

export default function SignInForm() {
  const [state, formAction, pending] = useActionState<ActionResult | undefined, FormData>(
    signInWithEmail,
    undefined,
  );
  const failed = state !== undefined && !state.ok;

  return (
    <form action={formAction} className="portal-form">
      <div className="portal-field">
        <label htmlFor="email">{signInPage.emailLabel}</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-describedby={failed ? 'email-error' : undefined}
        />
        {failed ? (
          <p id="email-error" className="portal-field__error" role="alert">
            {state.message}
          </p>
        ) : null}
      </div>

      <div className="portal-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? signInPage.pending : signInPage.button}
        </button>
      </div>
    </form>
  );
}
