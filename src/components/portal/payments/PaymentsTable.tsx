import { adminPayments } from '@/content/portal-payments';
import type { PaymentDTO, PaymentFilter } from '@/lib/dal/payments';
import { formatCents, formatDate, formatDueDate } from '@/lib/format';

import PaymentRowActions from './PaymentRowActions';

const copy = adminPayments.list;

/** Every charge the filter allows, one row each, with actions on the due ones. */
export default function PaymentsTable({
  payments,
  filter,
}: {
  payments: PaymentDTO[];
  filter: PaymentFilter;
}) {
  if (payments.length === 0) {
    return <p className="portal-empty">{copy.empty[filter]}</p>;
  }

  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">{copy.columns.family}</th>
            <th scope="col">{copy.columns.description}</th>
            <th scope="col" className="portal-table__num">
              {copy.columns.amount}
            </th>
            <th scope="col">{copy.columns.due}</th>
            <th scope="col">{copy.columns.status}</th>
            <th scope="col">{copy.columns.actions}</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>
                {payment.familyName ?? payment.email}
                {payment.familyName ? (
                  <>
                    <br />
                    <small>{payment.email}</small>
                  </>
                ) : null}
              </td>
              <td>
                {payment.description}
                {payment.note ? (
                  <>
                    <br />
                    <small>{payment.note}</small>
                  </>
                ) : null}
              </td>
              <td className="portal-table__num">{formatCents(payment.amountCents)}</td>
              <td>{payment.dueAt ? formatDueDate(payment.dueAt) : copy.noDue}</td>
              <td>
                <StatusText payment={payment} />
              </td>
              <td>{payment.status === 'due' ? <PaymentRowActions paymentId={payment.id} /> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusText({ payment }: { payment: PaymentDTO }) {
  const label = adminPayments.status[payment.status];
  if (payment.status === 'due') {
    return <span className="portal-pill">{label}</span>;
  }
  const when = payment.status === 'paid' && payment.paidAt ? formatDate(payment.paidAt) : null;
  return <span className="portal-pill portal-pill--muted">{copy.settled(label, when)}</span>;
}
