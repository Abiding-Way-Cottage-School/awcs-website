import type { Metadata } from 'next';

import ResourceList from '@/components/portal/documents/ResourceList';
import { resourcesPage as copy } from '@/content/portal-documents';
import { requireUser } from '@/lib/dal';
import { groupByCategory, listDocuments } from '@/lib/dal/documents';

export const metadata: Metadata = { title: 'Resources' };

export const dynamic = 'force-dynamic';

/** What the directors have shared, grouped by category; hidden documents never reach this list. */
export default async function ResourcesPage() {
  await requireUser();

  const documents = await listDocuments({ visibleOnly: true });
  const groups = groupByCategory(documents);

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.heading}</h1>
        <span className="lead">{copy.lead}</span>
      </header>

      <ResourceList groups={groups} />
    </>
  );
}
