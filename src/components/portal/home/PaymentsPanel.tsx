import { familyHome } from '@/content/portal-payments';
import { school } from '@/content/site';
import type { PaymentDTO } from '@/lib/dal/payments';
import { formatCents, formatDate, formatDueDate } from '@/lib/format';

const copy = familyHome.payments;

/**
 * What a family owes and how to pay it, then what it has settled. Venmo is
 * the only way to pay today; a director marks the charge paid when the
 * money arrives, so the instruction asks for the family name in the note.
 */
export default function PaymentsPanel({ payments }: { payments: PaymentDTO[] }) {
  const due = payments.filter((p) => p.status === 'due');
  const history = payments.filter((p) => p.status !== 'due');
  const totalDue = due.reduce((sum, p) => sum + p.amountCents, 0);

  return (
    <div className="panel panel--outline portal-stack">
      {due.length === 0 ? (
        <p className="portal-empty">{copy.nothingDue}</p>
      ) : (
        <>
          <div>
            <p className="eyebrow">{copy.totalDue}</p>
            <p className="portal-total">
              {formatCents(totalDue)}
            </p>
          </div>

          <div className="portal-table-wrap">
            <table className="portal-table">
              <caption className="eyebrow">
                {copy.dueHeading}
              </caption>
              <tbody>
                {due.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.description}</td>
                    <td>{payment.dueAt ? copy.due(formatDueDate(payment.dueAt)) : copy.noDue}</td>
                    <td className="portal-table__num">{formatCents(payment.amountCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="portal-actions">
            <a href={school.venmoUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              {copy.venmo}
            </a>
          </div>
          <p className="portal-field__hint portal-measure">
            {copy.instruction(formatCents(totalDue))}
          </p>
        </>
      )}

      <div>
        <p className="eyebrow portal-stack__label">
          {copy.historyHeading}
        </p>
        {history.length === 0 ? (
          <p className="portal-field__hint">{copy.historyEmpty}</p>
        ) : (
          <div className="portal-table-wrap">
            <table className="portal-table">
              <tbody>
                {history.map((payment) => (
                  <tr key={payment.id}>
                    <td>
                      {payment.description}
                      {payment.note ? (
                        <>
                          <br />
                          <small>{payment.note}</small>
                        </>
                      ) : null}
                    </td>
                    <td>
                      <span className="portal-pill portal-pill--muted">
                        {familyHome.status[payment.status]}
                        {payment.status === 'paid' && payment.paidAt ? ` ${formatDate(payment.paidAt)}` : null}
                      </span>
                    </td>
                    <td className="portal-table__num">{formatCents(payment.amountCents)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
