import Link from 'next/link';

import { deleteDocument, setVisibility } from '@/app/admin/documents/actions';
import { adminDocumentsPage as copy } from '@/content/portal-documents';
import type { DocumentDto } from '@/lib/dal/documents';
import { formatDate } from '@/lib/format';

import { contentTypeLabel, formatBytes } from './rules';

/** The directors' list: every document, visible or not, in Resources-page order. */
export default function DocumentTable({ documents }: { documents: DocumentDto[] }) {
  if (documents.length === 0) {
    return <p className="portal-empty">{copy.empty}</p>;
  }

  return (
    <div className="portal-table-wrap">
      <table className="portal-table">
        <thead>
          <tr>
            <th scope="col">{copy.table.title}</th>
            <th scope="col">{copy.table.category}</th>
            <th scope="col">{copy.table.kind}</th>
            <th scope="col">{copy.table.status}</th>
            <th scope="col">{copy.table.added}</th>
            <th scope="col">{copy.table.actions}</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocumentRow({ doc }: { doc: DocumentDto }) {
  const detail =
    doc.kind === 'file'
      ? [contentTypeLabel(doc.contentType), formatBytes(doc.sizeBytes)].filter(Boolean).join(' · ')
      : doc.href;

  return (
    <tr>
      <td>
        <strong>{doc.title}</strong>
        {doc.description ? (
          <>
            <br />
            <span className="portal-field__hint">{doc.description}</span>
          </>
        ) : null}
      </td>
      <td>{doc.category}</td>
      <td>
        {copy.kinds[doc.kind]}
        {detail ? (
          <>
            <br />
            <span className="portal-field__hint portal-break">
              {detail}
            </span>
          </>
        ) : null}
      </td>
      <td>
        <span className={doc.visible ? 'portal-pill' : 'portal-pill portal-pill--muted'}>
          {doc.visible ? copy.status.visible : copy.status.hidden}
        </span>
      </td>
      <td>
        <time dateTime={doc.createdAt}>{formatDate(doc.createdAt)}</time>
      </td>
      <td>
        <div className="portal-table__actions">
          <a href={doc.href} target="_blank" rel="noopener noreferrer">
            {copy.actions.open}
          </a>
          <Link href={`/admin/documents/?edit=${encodeURIComponent(doc.id)}`}>{copy.actions.edit}</Link>
          <form action={setVisibility.bind(null, doc.id, !doc.visible)}>
            <button type="submit" className="portal-link-button">
              {doc.visible ? copy.actions.hide : copy.actions.show}
            </button>
          </form>
          <Link href={`/admin/documents/?confirm=${encodeURIComponent(doc.id)}`}>
            {copy.actions.delete}
          </Link>
        </div>
      </td>
    </tr>
  );
}

/** The "are you sure?" step. Deleting is a POST to the bound action, so it works without JavaScript. */
export function DeleteConfirm({ doc }: { doc: DocumentDto }) {
  return (
    <div className="panel panel--outline portal-confirm">
      <h2>{copy.confirm.heading(doc.title)}</h2>
      <p className="portal-field__hint">
        {doc.kind === 'file' ? copy.confirm.file : copy.confirm.link}
      </p>
      <form action={deleteDocument.bind(null, doc.id)} className="portal-actions">
        <button type="submit" className="btn btn-primary">
          {copy.actions.confirmDelete}
        </button>
        <Link href="/admin/documents/" className="btn btn-ghost">
          {copy.actions.cancel}
        </Link>
      </form>
    </div>
  );
}
