import Link from 'next/link';

import Photo from '@/components/Photo';

/**
 * A photo beside prose. Alternate `reverse` down a page to get the editorial
 * rhythm the brand kit asks for without inventing new layouts each time.
 */
export default function Feature({
  eyebrow,
  heading,
  lead,
  body,
  image,
  imageShape = 'portrait',
  reverse = false,
  link,
  children,
}: {
  eyebrow?: string;
  heading: string;
  lead?: string;
  body?: string[];
  image: string;
  imageShape?: 'portrait' | 'landscape' | 'square' | 'tall';
  reverse?: boolean;
  link?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <div className={reverse ? 'feature feature--reverse' : 'feature'}>
      <div className="feature__media">
        <Photo src={image} shape={imageShape} />
      </div>

      <div className="feature__body">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{heading}</h2>
        {lead ? <span className="lead">{lead}</span> : null}

        {body ? (
          <div className="prose feature__prose">
            {body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        ) : null}

        {children}

        {link ? (
          <p className="feature__actions">
            <Link className="link-more" href={link.href}>
              {link.label}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
