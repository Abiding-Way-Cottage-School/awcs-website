import type { Metadata } from 'next';
import Link from 'next/link';

import FormBody from '@/components/portal/forms/FormBody';
import SignForm from '@/components/portal/forms/SignForm';
import { familyFormPage } from '@/content/portal-forms';
import { requireUser } from '@/lib/dal';
import { getFamilyForm } from '@/lib/dal/forms';
import { formatDateTime, formatDueDate } from '@/lib/format';

import { signForm } from '../actions';

export const metadata: Metadata = { title: 'Form' };

export const dynamic = 'force-dynamic';

type Params = Promise<{ id: string }>;

/**
 * A form to read and sign. The id may be the family's assignment or the
 * form itself; either way only the signed-in family's own copy is shown.
 * Once signed, the page shows the text exactly as it was signed.
 */
export default async function FamilyFormPage({ params }: { params: Params }) {
  const user = await requireUser();
  const { id } = await params;

  const view = await getFamilyForm(id, user.id);

  if (!view) {
    return (
      <>
        <header className="portal-page-head">
          <p className="eyebrow">{familyFormPage.eyebrow}</p>
          <h1>{familyFormPage.notFound.heading}</h1>
        </header>
        <p className="portal-empty">{familyFormPage.notFound.body}</p>
        <p className="portal-section__foot">
          <Link href="/portal/" className="link-more">
            {familyFormPage.back}
          </Link>
        </p>
      </>
    );
  }

  const notice =
    view.blocked === 'signed' && view.signedAt
      ? familyFormPage.signed(view.signerName ?? user.familyName ?? user.email, formatDateTime(view.signedAt))
      : view.blocked === 'retired'
        ? familyFormPage.retired
        : view.blocked === 'superseded'
          ? familyFormPage.superseded
          : view.dueAt
            ? familyFormPage.due(formatDueDate(view.dueAt))
            : null;

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{familyFormPage.eyebrow}</p>
        <h1>{view.title}</h1>
        {notice ? <span className="lead">{notice}</span> : null}
      </header>

      {view.blocked === 'signed' ? (
        <p className="portal-notice" role="status">
          {familyFormPage.signedNote}
        </p>
      ) : null}

      <section className="portal-section" aria-label={view.title}>
        <FormBody body={view.body} />
      </section>

      {view.blocked === null ? (
        <section className="portal-section" aria-labelledby="sign-heading">
          <h2 id="sign-heading">{familyFormPage.signHeading}</h2>
          <SignForm action={signForm.bind(null, view.assignmentId)} />
        </section>
      ) : null}

      <p className="portal-section__foot">
        <Link href="/portal/" className="link-more">
          {familyFormPage.back}
        </Link>
      </p>
    </>
  );
}
