import Link from 'next/link';

import { usersPage } from '@/content/portal-users';
import type { UserSummary } from '@/lib/dal/users';
import { formatDate } from '@/lib/format';

/** The accounts list. Each family name links to the account's page. */
export default function UsersTable({ users }: { users: UserSummary[] }) {
  if (users.length === 0) {
    return <p className="portal-empty">{usersPage.empty}</p>;
  }

  const { columns } = usersPage;

  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">{columns.familyName}</th>
            <th scope="col">{columns.email}</th>
            <th scope="col">{columns.role}</th>
            <th scope="col">{columns.status}</th>
            <th scope="col">{columns.created}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link href={`/admin/users/${user.id}/`}>
                  {user.familyName ?? <em>{usersPage.noFamilyName}</em>}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{usersPage.roles[user.role]}</td>
              <td>
                <span className={user.active ? 'portal-pill' : 'portal-pill portal-pill--muted'}>
                  {user.active ? usersPage.status.active : usersPage.status.inactive}
                </span>
              </td>
              <td>{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
