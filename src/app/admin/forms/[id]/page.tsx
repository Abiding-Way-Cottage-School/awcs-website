import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import AssignForm from '@/components/portal/forms/AssignForm';
import ConfirmButton from '@/components/portal/forms/ConfirmButton';
import FormEditor from '@/components/portal/forms/FormEditor';
import SignaturesTable from '@/components/portal/forms/SignaturesTable';
import { adminFormPage, adminFormsPage } from '@/content/portal-forms';
import { requireAdmin } from '@/lib/dal';
import {
  countActiveFamilies,
  getForm,
  listAssignableUsers,
  listAssignmentsForForm,
} from '@/lib/dal/forms';

import { assignForm, restoreForm, retireForm, updateForm } from '../actions';

export const metadata: Metadata = { title: 'Form' };

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;

/**
 * One form: its text to edit, the families to send it to, and who has
 * signed. A form that no longer exists sends the director back to the list.
 */
export default async function AdminFormPage({ params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;

  const form = await getForm(id);
  if (!form) redirect('/admin/forms/');

  const [assignments, candidates, familyCount] = await Promise.all([
    listAssignmentsForForm(form.id),
    listAssignableUsers(form.id),
    countActiveFamilies(),
  ]);

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">
          <Link href="/admin/forms/">
            ← {adminFormPage.back}
          </Link>
        </p>
        <h1>{form.title}</h1>
        <span className="lead">
          {adminFormPage.versionLabel(form.version)}
          {form.active ? null : (
            <>
              {' · '}
              <span className="portal-pill portal-pill--muted">
                {adminFormsPage.status.retired}
              </span>
            </>
          )}
        </span>
      </header>

      {form.active ? null : (
        <p className="portal-notice" role="status">
          {adminFormPage.retired}
        </p>
      )}

      <section className="portal-section" aria-labelledby="form-edit">
        <h2 id="form-edit">{adminFormPage.editHeading}</h2>
        <p className="portal-section__lead">
          {adminFormPage.editNote}
        </p>
        <FormEditor
          action={updateForm.bind(null, form.id)}
          mode="edit"
          initial={{ title: form.title, body: form.body, version: form.version }}
        />
      </section>

      {form.active ? (
        <section className="portal-section" aria-labelledby="form-assign">
          <h2 id="form-assign">{adminFormPage.assignHeading}</h2>
          {familyCount === 0 ? (
            <p className="portal-empty">{adminFormPage.noFamilies}</p>
          ) : candidates.length === 0 ? (
            <p className="portal-empty">{adminFormPage.assignEmpty}</p>
          ) : (
            <>
              <p className="portal-section__lead">
                {adminFormPage.assignLead}
              </p>
              <AssignForm action={assignForm.bind(null, form.id)} candidates={candidates} />
            </>
          )}
        </section>
      ) : null}

      <section className="portal-section" aria-labelledby="form-signatures">
        <h2 id="form-signatures">{adminFormPage.signaturesHeading}</h2>
        <SignaturesTable formId={form.id} items={assignments} />
      </section>

      <section className="portal-section">
        {form.active ? (
          <ConfirmButton
            action={retireForm.bind(null, form.id)}
            label={adminFormPage.retire}
            question={adminFormPage.retireConfirm}
          />
        ) : (
          <ConfirmButton
            action={restoreForm.bind(null, form.id)}
            label={adminFormPage.restore}
            question={adminFormPage.restoreConfirm}
          />
        )}
      </section>
    </>
  );
}
