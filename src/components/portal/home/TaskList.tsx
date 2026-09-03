import Link from 'next/link';

import { familyHome } from '@/content/portal-payments';
import type { Task } from '@/lib/dal/tasks';
import { formatCents, formatDueDate } from '@/lib/format';

const copy = familyHome.tasks;

/** What the co-op is waiting on: each task is a row with one thing to do. */
export default function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <p className="portal-empty">{copy.empty}</p>;
  }

  return (
    <ul className="portal-list">
      {tasks.map((task) => (
        <li key={`${task.kind}-${task.id}`} className="portal-task">
          <div>
            <p className="eyebrow">{task.kind === 'form' ? copy.formKind : copy.paymentKind}</p>
            <p className="portal-task__title">
              {task.title}
              {task.kind === 'payment' ? ` — ${formatCents(task.amountCents)}` : null}
            </p>
            {task.dueAt ? <p className="portal-task__meta">{copy.due(formatDueDate(task.dueAt))}</p> : null}
          </div>
          <Link href={task.href} className="link-more">
            {task.kind === 'form' ? copy.form : copy.payment}
          </Link>
        </li>
      ))}
    </ul>
  );
}
