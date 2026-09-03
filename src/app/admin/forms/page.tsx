import type { Metadata } from 'next';

import FormEditor from '@/components/portal/forms/FormEditor';
import FormsTable from '@/components/portal/forms/FormsTable';
import { adminFormsPage } from '@/content/portal-forms';
import { requireAdmin } from '@/lib/dal';
import { listForms } from '@/lib/dal/forms';

import { createForm } from './actions';

export const metadata: Metadata = { title: 'Forms' };

export const dynamic = 'force-dynamic';

/** Every form the co-op has written, and a place to write the next one. */
export default async function AdminFormsPage() {
  await requireAdmin();
  const items = await listForms();

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{adminFormsPage.eyebrow}</p>
        <h1>{adminFormsPage.heading}</h1>
        <span className="lead">{adminFormsPage.lead}</span>
      </header>

      <section className="portal-section" aria-label={adminFormsPage.listLabel}>
        <FormsTable items={items} />
      </section>

      <section className="portal-section" aria-labelledby="forms-new">
        <h2 id="forms-new">{adminFormsPage.newHeading}</h2>
        <p className="portal-section__lead">
          {adminFormsPage.newLead}
        </p>
        <FormEditor action={createForm} mode="create" />
      </section>
    </>
  );
}
