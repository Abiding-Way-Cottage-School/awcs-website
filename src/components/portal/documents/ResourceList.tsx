import { resourcesPage as copy } from '@/content/portal-documents';
import type { DocumentGroup } from '@/lib/dal/documents';

import { contentTypeLabel, formatBytes } from './rules';

/**
 * The families' view: one ruled list per category. Files open in a new tab
 * through the portal's file route; links go straight out.
 */
export default function ResourceList({ groups }: { groups: DocumentGroup[] }) {
  if (groups.length === 0) {
    return <p className="portal-empty">{copy.empty}</p>;
  }

  return (
    <>
      {groups.map((group) => (
        <section key={group.category} className="portal-section" aria-labelledby={headingId(group.category)}>
          <h2 id={headingId(group.category)}>{group.category}</h2>
          <ul className="portal-list">
            {group.documents.map((doc) => {
              const meta =
                doc.kind === 'file'
                  ? [contentTypeLabel(doc.contentType), formatBytes(doc.sizeBytes)].filter(Boolean).join(' · ')
                  : hostOf(doc.href);
              return (
                <li key={doc.id} className="portal-task">
                  <div>
                    <a
                      className="portal-task__title"
                      href={doc.href}
                      target="_blank"
                      rel={doc.kind === 'link' ? 'noopener noreferrer' : 'noopener'}
                    >
                      {doc.title}
                    </a>
                    {doc.description ? <p className="portal-task__meta">{doc.description}</p> : null}
                  </div>
                  <div className="portal-task__meta">
                    {meta ? <span>{meta}</span> : null}
                    {doc.kind === 'file' ? (
                      <>
                        {meta ? ' · ' : null}
                        <a href={`${doc.href}?download=1`}>{copy.download}</a>
                      </>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}

function headingId(category: string): string {
  return `resources-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function hostOf(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}
