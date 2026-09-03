import { removeAssignment } from '@/app/admin/forms/actions';
import { adminFormPage } from '@/content/portal-forms';
import type { AssignmentSummary } from '@/lib/dal/forms';
import { formatDate, formatDateTime, formatDueDate } from '@/lib/format';

import ConfirmButton from './ConfirmButton';

/**
 * Who has the form and who has signed. An unsigned copy can be taken back;
 * a signed one is a record and has no button.
 */
export default function SignaturesTable({
  formId,
  items,
}: {
  formId: string;
  items: AssignmentSummary[];
}) {
  if (items.length === 0) {
    return <p className="portal-empty">{adminFormPage.signaturesEmpty}</p>;
  }

  const c = adminFormPage.columns;

  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">{c.family}</th>
            <th scope="col">{c.version}</th>
            <th scope="col">{c.sent}</th>
            <th scope="col">{c.due}</th>
            <th scope="col">{c.status}</th>
            <th scope="col">{c.signed}</th>
            <th scope="col">
              <span className="portal-sr-only">{adminFormPage.actionsColumn}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => {
            const status = a.signedAt
              ? adminFormPage.rowStatus.signed
              : a.current
                ? adminFormPage.rowStatus.waiting
                : adminFormPage.rowStatus.superseded;
            const muted = a.signedAt !== null || !a.current;
            return (
              <tr key={a.id}>
                <td>
                  {a.familyName ?? a.email}
                  {a.familyName && a.email ? (
                    <>
                      <br />
                      <span className="portal-field__hint">{a.email}</span>
                    </>
                  ) : null}
                </td>
                <td>{a.formVersion}</td>
                <td>{formatDate(a.assignedAt)}</td>
                <td>{formatDueDate(a.dueAt)}</td>
                <td>
                  <span className={muted ? 'portal-pill portal-pill--muted' : 'portal-pill'}>
                    {status}
                  </span>
                </td>
                <td>
                  {a.signedAt ? (
                    <>
                      {formatDateTime(a.signedAt)}
                      {a.signerName ? (
                        <>
                          <br />
                          <span className="portal-field__hint">
                            {adminFormPage.signedBy(a.signerName)}
                          </span>
                        </>
                      ) : null}
                    </>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  {a.signedAt ? null : (
                    <ConfirmButton
                      action={removeAssignment.bind(null, formId, a.id)}
                      label={adminFormPage.remove}
                      question={adminFormPage.removeConfirm}
                      size="small"
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
