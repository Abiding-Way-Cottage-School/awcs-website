import type { Metadata } from 'next';

import NewUserForm from '@/components/portal/users/NewUserForm';
import UsersTable from '@/components/portal/users/UsersTable';
import { usersPage } from '@/content/portal-users';
import { requireAdmin } from '@/lib/dal';
import { listUsers } from '@/lib/dal/users';

export const metadata: Metadata = { title: 'Users' };

export const dynamic = 'force-dynamic';

/** Every account, and the form that adds one. */
export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await listUsers();

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{usersPage.eyebrow}</p>
        <h1>{usersPage.heading}</h1>
        <span className="lead">{usersPage.lead}</span>
      </header>

      <section className="portal-section" aria-label={usersPage.heading}>
        <UsersTable users={users} />
      </section>

      <section className="portal-section" aria-labelledby="add-user">
        <h2 id="add-user">{usersPage.addHeading}</h2>
        <p className="portal-section__lead">
          {usersPage.addLead}
        </p>
        <NewUserForm />
      </section>
    </>
  );
}
