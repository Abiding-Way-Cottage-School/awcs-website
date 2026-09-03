import Link from 'next/link';

import { userDetailPage } from '@/content/portal-users';
import type { UserActivity as Activity } from '@/lib/dal/users';
import { formatCents, formatDate, formatDueDate } from '@/lib/format';

/**
 * One family's forms and charges, as two tables with a one-line summary
 * above each. Managing them happens in the Forms and Payments sections;
 * this is the director's overview.
 */
export default function UserActivity({ activity }: { activity: Activity }) {
  const copy = userDetailPage;

  return (
    <>
      <section className="portal-section" aria-labelledby="user-forms">
        <h2 id="user-forms">{copy.formsHeading}</h2>
        <p className="portal-field__hint">{copy.summary.unsigned(activity.unsignedCount)}</p>

        {activity.assignments.length === 0 ? (
          <p className="portal-empty">{copy.formsEmpty}</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th scope="col">{copy.formsColumns.title}</th>
                  <th scope="col">{copy.formsColumns.version}</th>
                  <th scope="col">{copy.formsColumns.assigned}</th>
                  <th scope="col">{copy.formsColumns.due}</th>
                  <th scope="col">{copy.formsColumns.signed}</th>
                </tr>
              </thead>
              <tbody>
                {activity.assignments.map((a) => {
                  const retired = !a.signedAt && !a.formActive;
                  const superseded = !a.signedAt && !retired && a.formVersion !== a.currentVersion;
                  return (
                    <tr key={a.id}>
                      <td>
                        <Link href={`/admin/forms/${a.formId}/`}>{a.formTitle}</Link>
                      </td>
                      <td className="portal-table__num">{a.formVersion}</td>
                      <td>{formatDate(a.assignedAt)}</td>
                      <td>{formatDueDate(a.dueAt)}</td>
                      <td>
                        {a.signedAt ? (
                          <>
                            <span className="portal-pill portal-pill--muted">
                              {copy.formStatus.signed}
                            </span>{' '}
                            {formatDate(a.signedAt)}
                            {a.signerName ? ` · ${a.signerName}` : ''}
                          </>
                        ) : (
                          <span className={retired || superseded ? 'portal-pill portal-pill--muted' : 'portal-pill'}>
                            {retired
                              ? copy.formStatus.retired
                              : superseded
                                ? copy.formStatus.superseded
                                : copy.formStatus.unsigned}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <p className="portal-section__foot">
          <Link href="/admin/forms/" className="link-more">
            {copy.manageForms}
          </Link>
        </p>
      </section>

      <section className="portal-section" aria-labelledby="user-payments">
        <h2 id="user-payments">{copy.paymentsHeading}</h2>
        <p className="portal-field__hint">
          {copy.summary.due(formatCents(activity.dueCents), activity.dueCount)}
        </p>

        {activity.payments.length === 0 ? (
          <p className="portal-empty">{copy.paymentsEmpty}</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <thead>
                <tr>
                  <th scope="col">{copy.paymentsColumns.description}</th>
                  <th scope="col" className="portal-table__num">
                    {copy.paymentsColumns.amount}
                  </th>
                  <th scope="col">{copy.paymentsColumns.due}</th>
                  <th scope="col">{copy.paymentsColumns.status}</th>
                  <th scope="col">{copy.paymentsColumns.paid}</th>
                </tr>
              </thead>
              <tbody>
                {activity.payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.description}</td>
                    <td className="portal-table__num">{formatCents(p.amountCents)}</td>
                    <td>{formatDueDate(p.dueAt)}</td>
                    <td>
                      <span className={p.status === 'due' ? 'portal-pill' : 'portal-pill portal-pill--muted'}>
                        {copy.paymentStatus[p.status]}
                      </span>
                    </td>
                    <td>{formatDate(p.paidAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="portal-section__foot">
          <Link href="/admin/payments/" className="link-more">
            {copy.managePayments}
          </Link>
        </p>
      </section>
    </>
  );
}
