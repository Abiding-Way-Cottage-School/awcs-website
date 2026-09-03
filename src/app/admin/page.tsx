import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/dal';

export const dynamic = 'force-dynamic';

/** /admin/ has no page of its own; directors start at the users list. */
export default async function AdminIndexPage() {
  await requireAdmin();
  redirect('/admin/users/');
}
