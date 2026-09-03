import type { Metadata } from 'next';
import Link from 'next/link';

import AddChargeForm from '@/components/portal/payments/AddChargeForm';
import PaymentsTable from '@/components/portal/payments/PaymentsTable';
import { adminPayments } from '@/content/portal-payments';
import { requireAdmin } from '@/lib/dal';
import {
  listActiveFamilies,
  listPayments,
  summarise,
  type PaymentFilter,
} from '@/lib/dal/payments';
import { formatCents } from '@/lib/format';

export const metadata: Metadata = { title: 'Payments' };

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const filters: PaymentFilter[] = ['unpaid', 'all'];

function readFilter(value: string | string[] | undefined): PaymentFilter {
  return value === 'all' ? 'all' : 'unpaid';
}

/**
 * Add a charge, then the list. `?filter=all` widens the list to settled
 * charges; the default shows only what is still owed.
 */
export default async function AdminPaymentsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const filter = readFilter(params.filter);

  const [families, payments] = await Promise.all([listActiveFamilies(), listPayments(filter)]);
  const summary = summarise(payments);

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{adminPayments.eyebrow}</p>
        <h1>{adminPayments.heading}</h1>
        <span className="lead">{adminPayments.lead}</span>
      </header>

      <section className="portal-section" aria-labelledby="add-charge">
        <h2 id="add-charge">{adminPayments.add.heading}</h2>
        <AddChargeForm families={families} />
      </section>

      <section className="portal-section" aria-labelledby="charges">
        <h2 id="charges">{adminPayments.list.heading}</h2>

        <nav className="portal-actions portal-filters" aria-label={adminPayments.list.filterLabel}>
          {filters.map((option) => {
            const active = option === filter;
            return (
              <Link
                key={option}
                href={option === 'unpaid' ? '/admin/payments/' : `/admin/payments/?filter=${option}`}
                className={active ? 'portal-pill' : 'portal-pill portal-pill--muted'}
                aria-current={active ? 'page' : undefined}
              >
                {adminPayments.list.filters[option]}
              </Link>
            );
          })}
          {summary.dueCount > 0 ? (
            <small>{adminPayments.list.summary(summary.dueCount, formatCents(summary.dueCents))}</small>
          ) : null}
        </nav>

        <PaymentsTable payments={payments} filter={filter} />
      </section>
    </>
  );
}
