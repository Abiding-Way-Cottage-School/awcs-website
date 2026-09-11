import Link from 'next/link';

import Photo from '@/components/Photo';

/** The opener on every interior page: breadcrumb, eyebrow, heading, lead, photo. */
export default function PageHeader({
  eyebrow,
  heading,
  lead,
  image,
  imageShape = 'landscape',
  parent,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  image?: string;
  /** Landscape suits most pages; use portrait when the photograph is of people. */
  imageShape?: 'landscape' | 'portrait';
  parent?: { label: string; href: string };
}) {
  return (
    <header className="page-header">
      <div className="container page-header__inner">
        <div>
          {parent ? (
            <p className="breadcrumb">
              <Link href={parent.href}>{parent.label}</Link>
              <span aria-hidden="true">·</span>
              {eyebrow}
            </p>
          ) : (
            <p className="eyebrow">{eyebrow}</p>
          )}
          <h1>{heading}</h1>
          {lead ? <span className="lead">{lead}</span> : null}
        </div>

        {image ? (
          <Photo src={image} shape={imageShape} preload sizes="(min-width: 60rem) 45vw, 100vw" />
        ) : null}
      </div>
    </header>
  );
}
