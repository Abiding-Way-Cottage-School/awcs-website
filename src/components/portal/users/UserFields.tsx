'use client';

import { userForm, usersPage } from '@/content/portal-users';
import type { Role } from '@/db/schema';
import { fieldError, type ActionResult } from '@/lib/action-result';

/**
 * The three fields an account has, shared by the add and edit forms. The
 * `idPrefix` keeps ids unique when both forms are on one page.
 */
export default function UserFields({
  idPrefix,
  state,
  defaults,
}: {
  idPrefix: string;
  state: ActionResult | undefined;
  defaults?: { email: string; familyName: string; role: Role };
}) {
  const emailError = fieldError(state, 'email');
  const familyNameError = fieldError(state, 'familyName');
  const roleError = fieldError(state, 'role');

  const emailId = `${idPrefix}-email`;
  const familyNameId = `${idPrefix}-family-name`;
  const roleId = `${idPrefix}-role`;

  return (
    <>
      <div className="portal-field">
        <label htmlFor={emailId}>{userForm.emailLabel}</label>
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="off"
          required
          defaultValue={defaults?.email ?? ''}
          aria-describedby={emailError ? `${emailId}-error` : `${emailId}-hint`}
          aria-invalid={emailError ? true : undefined}
        />
        {emailError ? (
          <p id={`${emailId}-error`} className="portal-field__error" role="alert">
            {emailError}
          </p>
        ) : (
          <p id={`${emailId}-hint`} className="portal-field__hint">
            {userForm.emailHint}
          </p>
        )}
      </div>

      <div className="portal-field">
        <label htmlFor={familyNameId}>{userForm.familyNameLabel}</label>
        <input
          id={familyNameId}
          name="familyName"
          type="text"
          autoComplete="off"
          required
          maxLength={80}
          defaultValue={defaults?.familyName ?? ''}
          aria-describedby={familyNameError ? `${familyNameId}-error` : `${familyNameId}-hint`}
          aria-invalid={familyNameError ? true : undefined}
        />
        {familyNameError ? (
          <p id={`${familyNameId}-error`} className="portal-field__error" role="alert">
            {familyNameError}
          </p>
        ) : (
          <p id={`${familyNameId}-hint`} className="portal-field__hint">
            {userForm.familyNameHint}
          </p>
        )}
      </div>

      <div className="portal-field">
        <label htmlFor={roleId}>{userForm.roleLabel}</label>
        <select
          id={roleId}
          name="role"
          required
          defaultValue={defaults?.role ?? 'family'}
          aria-describedby={roleError ? `${roleId}-error` : `${roleId}-hint`}
          aria-invalid={roleError ? true : undefined}
        >
          <option value="family">{usersPage.roles.family}</option>
          <option value="admin">{usersPage.roles.admin}</option>
        </select>
        {roleError ? (
          <p id={`${roleId}-error`} className="portal-field__error" role="alert">
            {roleError}
          </p>
        ) : (
          <p id={`${roleId}-hint`} className="portal-field__hint">
            {userForm.roleHint}
          </p>
        )}
      </div>
    </>
  );
}
