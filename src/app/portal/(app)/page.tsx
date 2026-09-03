import PaymentsPanel from '@/components/portal/home/PaymentsPanel';
import TaskList from '@/components/portal/home/TaskList';
import { familyHome } from '@/content/portal-payments';
import { requireUser } from '@/lib/dal';
import { listPaymentsFor } from '@/lib/dal/payments';
import { listTasksFor } from '@/lib/dal/tasks';

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * The family home: what needs doing, then the payments in full.
 *
 * `?denied=1` is a family account that tried an /admin page; `?signed=1`
 * is the Forms module landing here after a signature. Both are one-line
 * notices above the tasks.
 */
export default async function PortalHomePage({ searchParams }: { searchParams: SearchParams }) {
  const user = await requireUser();
  const { denied, signed } = await searchParams;

  const [tasks, payments] = await Promise.all([listTasksFor(user.id), listPaymentsFor(user.id)]);

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{familyHome.eyebrow}</p>
        <h1>{familyHome.heading(user.familyName)}</h1>
        <span className="lead">{familyHome.lead}</span>
      </header>

      {denied ? (
        <p className="portal-notice" role="status">
          {familyHome.denied}
        </p>
      ) : null}
      {signed ? (
        <p className="portal-notice" role="status">
          {familyHome.signed}
        </p>
      ) : null}

      <section className="portal-section" aria-labelledby="tasks">
        <h2 id="tasks">{familyHome.tasks.heading}</h2>
        <TaskList tasks={tasks} />
      </section>

      <section className="portal-section" id="payments" aria-labelledby="payments-heading">
        <h2 id="payments-heading">{familyHome.payments.heading}</h2>
        <PaymentsPanel payments={payments} />
      </section>
    </>
  );
}
