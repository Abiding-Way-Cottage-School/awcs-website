import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import AccountSwitch from '@/components/portal/users/AccountSwitch';
import EditUserForm from '@/components/portal/users/EditUserForm';
import UserActivity from '@/components/portal/users/UserActivity';
import { userDetailPage, usersPage } from '@/content/portal-users';
import { requireAdmin } from '@/lib/dal';
import { getUser, getUserActivity } from '@/lib/dal/users';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = { title: 'Users' };

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/**
 * One account: who they are, the form that changes it, the switch that
 * closes it, and what they have been asked to sign and pay.
 * `?created=1` is the add form's landing.
 */
export default async function AdminUserPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const admin = await requireAdmin();
  const { id } = await params;
  const { created } = await searchParams;

  const user = await getUser(id);
  if (!user) notFound();

  const activity = await getUserActivity(user.id);
  const copy = userDetailPage;

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">
          <Link href="/admin/users/">
            {copy.back}
          </Link>
        </p>
        <h1>{user.familyName ?? user.email}</h1>
        <span className="lead">{user.familyName ? user.email : usersPage.noFamilyName}</span>
        <p className="portal-page-head__meta">
          <span className={user.active ? 'portal-pill' : 'portal-pill portal-pill--muted'}>
            {user.active ? usersPage.status.active : usersPage.status.inactive}
          </span>
          {' · '}
          {usersPage.roles[user.role]}
          {' · '}
          {copy.addedOn} {formatDate(user.createdAt)}
        </p>
      </header>

      {created ? (
        <p className="portal-notice" role="status">
          {usersPage.createdNotice}
        </p>
      ) : null}

      <section className="portal-section" aria-labelledby="user-details">
        <h2 id="user-details">{copy.editHeading}</h2>
        <EditUserForm
          user={{ id: user.id, email: user.email, familyName: user.familyName, role: user.role }}
        />
      </section>

      <section className="portal-section" aria-labelledby="user-account">
        <h2 id="user-account">{copy.accountHeading}</h2>
        <AccountSwitch
          userId={user.id}
          active={user.active}
          isSelf={user.id === admin.id}
        />
      </section>

      <UserActivity activity={activity} />
    </>
  );
}
