import Link from 'next/link';

import { adminFormsPage } from '@/content/portal-forms';
import type { FormSummary } from '@/lib/dal/forms';
import { formatDate } from '@/lib/format';

/** The directors' list of forms; each title opens the form's own page. */
export default function FormsTable({ items }: { items: FormSummary[] }) {
  if (items.length === 0) {
    return <p className="portal-empty">{adminFormsPage.empty}</p>;
  }

  const c = adminFormsPage.columns;

  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">{c.title}</th>
            <th scope="col">{c.version}</th>
            <th scope="col">{c.status}</th>
            <th scope="col" className="portal-table__num">
              {c.assigned}
            </th>
            <th scope="col" className="portal-table__num">
              {c.signed}
            </th>
            <th scope="col">{c.updated}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((form) => (
            <tr key={form.id}>
              <td>
                <Link href={`/admin/forms/${form.id}/`}>{form.title}</Link>
              </td>
              <td>{form.version}</td>
              <td>
                <span className={form.active ? 'portal-pill' : 'portal-pill portal-pill--muted'}>
                  {form.active ? adminFormsPage.status.active : adminFormsPage.status.retired}
                </span>
              </td>
              <td className="portal-table__num">{form.assigned}</td>
              <td className="portal-table__num">{form.signed}</td>
              <td>{formatDate(form.updatedAt ?? form.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
