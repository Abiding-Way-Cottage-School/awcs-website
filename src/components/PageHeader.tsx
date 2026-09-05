import Link from 'next/link';

import Photo from '@/components/Photo';

/** The opener on every interior page: breadcrumb, eyebrow, heading, lead, photo. */
export default function PageHeader({
  eyebrow,
  heading,
  lead,
  image,
  parent,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
  image?: string;
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
          <Photo src={image} shape="landscape" preload sizes="(min-width: 60rem) 45vw, 100vw" />
        ) : null}
      </div>
    </header>
  );
}
