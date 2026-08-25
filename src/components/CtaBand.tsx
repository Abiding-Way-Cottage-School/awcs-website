import Link from 'next/link';

type Action = { label: string; href: string };

/** The closing invitation on most pages. */
export default function CtaBand({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
  surface = 'alt',
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  primary?: Action;
  secondary?: Action;
  surface?: 'alt' | 'linen' | 'dark';
}) {
  const surfaceClass =
    surface === 'dark'
      ? 'surface-dark'
      : surface === 'linen'
        ? 'surface-linen'
        : 'surface-alt';

  const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

  const render = (action: Action, variant: string) =>
    isExternal(action.href) ? (
      <a className={`btn ${variant}`} href={action.href}>
        {action.label}
      </a>
    ) : (
      <Link className={`btn ${variant}`} href={action.href}>
        {action.label}
      </Link>
    );

  return (
    <section className={`section ${surfaceClass} cta`}>
      <div className="container container--narrow reveal">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 style={{ marginTop: eyebrow ? '1.25rem' : 0 }}>{heading}</h2>
        {body ? (
          <p className="lead" style={{ marginTop: '1rem' }}>
            {body}
          </p>
        ) : null}
        {primary || secondary ? (
          <div className="cta__actions">
            {primary ? render(primary, 'btn-primary') : null}
            {secondary ? render(secondary, 'btn-ghost') : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
