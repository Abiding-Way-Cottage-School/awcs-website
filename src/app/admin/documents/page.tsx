import type { Metadata } from 'next';

import DocumentTable, { DeleteConfirm } from '@/components/portal/documents/DocumentTable';
import EditDocumentForm from '@/components/portal/documents/EditDocumentForm';
import LinkForm from '@/components/portal/documents/LinkForm';
import UploadForm from '@/components/portal/documents/UploadForm';
import { adminDocumentsPage as copy } from '@/content/portal-documents';
import { requireAdmin } from '@/lib/dal';
import { getDocument, listCategories, listDocuments } from '@/lib/dal/documents';

export const metadata: Metadata = { title: 'Documents' };

export const dynamic = 'force-dynamic';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Everything on one page: the list, the two ways to add, and — when the URL
 * asks for it — an edit form or a delete confirmation above the list. The
 * URL carries that state so every step is a link or a form and survives a
 * reload.
 */
export default async function AdminDocumentsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();

  const params = await searchParams;
  const editId = first(params.edit);
  const confirmId = first(params.confirm);

  const [documents, categories, editing, confirming] = await Promise.all([
    listDocuments({ visibleOnly: false }),
    listCategories(),
    editId ? getDocument(editId) : null,
    confirmId ? getDocument(confirmId) : null,
  ]);

  const notice =
    params.uploaded ? copy.notices.uploaded
    : params.saved ? copy.notices.saved
    : params.updated ? copy.notices.updated
    : params.deleted ? copy.notices.deleted
    : params.missing || (editId && !editing) || (confirmId && !confirming) ? copy.notices.missing
    : null;

  return (
    <>
      <header className="portal-page-head">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.heading}</h1>
        <span className="lead">{copy.lead}</span>
      </header>

      {notice ? (
        <p className="portal-notice" role="status">
          {notice}
        </p>
      ) : null}

      {editing ? (
        <section className="portal-section" aria-labelledby="edit-heading">
          <h2 id="edit-heading">
            {copy.sections.edit}: {editing.title}
          </h2>
          <EditDocumentForm
            document={{
              id: editing.id,
              title: editing.title,
              description: editing.description,
              category: editing.category,
              kind: editing.kind,
              url: editing.kind === 'link' ? editing.href : null,
              filename: editing.filename,
              sortOrder: editing.sortOrder,
              visible: editing.visible,
            }}
            categories={categories}
          />
        </section>
      ) : null}

      {confirming ? (
        <section className="portal-section" aria-label={copy.sections.confirm}>
          <DeleteConfirm doc={confirming} />
        </section>
      ) : null}

      <section className="portal-section" aria-labelledby="list-heading">
        <h2 id="list-heading">{copy.sections.list}</h2>
        <DocumentTable documents={documents} />
      </section>

      <section className="portal-section" aria-labelledby="upload-heading">
        <h2 id="upload-heading">{copy.sections.upload}</h2>
        <UploadForm categories={categories} />
      </section>

      <section className="portal-section" aria-labelledby="link-heading">
        <h2 id="link-heading">{copy.sections.link}</h2>
        <LinkForm categories={categories} />
      </section>
    </>
  );
}
