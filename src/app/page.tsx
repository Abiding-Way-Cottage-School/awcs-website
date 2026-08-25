import Image from 'next/image';

import { asset } from '@/lib/asset';

import SiteShell from '@/components/SiteShell';

import {
  about,
  ages,
  atmosphere,
  contact,
  day,
  give,
  hero,
  school,
} from '@/content/site';

/**
 * The homepage follows the page rhythm set out in the brand kit:
 *
 *   olive hero → cream about → linen band → cream-2 day →
 *   slate statement → cream ages → cream-2 giving → cream contact → olive footer
 *
 * Light surfaces carry the site; the dark ones are deliberate punctuation.
 */
export default function HomePage() {
  const [firstLine, secondLine] = school.nameLines;

  return (
    <SiteShell>
      {/* ---- Hero ---- */}
      <section className="hero surface-dark framed">
        <div className="container hero__inner">
          <Image
            src={asset('/brand/logo-cream.png')}
            alt=""
            width={512}
            height={512}
            className="hero__logo"
            priority
            aria-hidden="true"
          />

          <h1 className="hero-title">
            {firstLine}
            <em>{secondLine}</em>
          </h1>

          <div className="rule-short" />

          <p className="hero__tagline">{school.tagline}</p>
          <p className="hero__motto">{school.motto}</p>
        </div>
      </section>

      {/* ---- About ---- */}
      <section id="about" className="section">
        <div className="container split">
          <div className="reveal">
            <div className="section-head">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2>{about.heading}</h2>
              <span className="lead">{about.lead}</span>
            </div>

            <div className="prose" style={{ marginTop: '2rem' }}>
              {about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="card card--dark reveal">
            <span className="eyebrow">{about.commitments.eyebrow}</span>
            <ul className="ruled-list numbered" style={{ marginTop: '1.25rem' }}>
              {about.commitments.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* ---- Linen band ---- */}
      <section className="section-tight surface-linen band">
        <div className="container reveal">
          <span className="eyebrow">{atmosphere.eyebrow}</span>
          <p className="band__words">
            {atmosphere.words.map((word, i) => (
              <span key={word}>
                {i > 0 && <span className="band__sep">·&nbsp;&nbsp;</span>}
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ---- A day at co-op ---- */}
      <section id="day" className="section surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{day.eyebrow}</span>
            <h2>{day.heading}</h2>
            <span className="lead">{day.lead}</span>
          </div>

          <ol className="schedule reveal">
            {day.schedule.map((slot) => (
              <li key={slot.time}>
                <span className="schedule__time">{slot.time}</span>
                <span className="schedule__label">{slot.label}</span>
                <span className="schedule__note">{slot.note}</span>
              </li>
            ))}
          </ol>

          <div className="reveal" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <span className="eyebrow">{day.subjects.eyebrow}</span>
            <ul className="taglist">
              {day.subjects.items.map((subject) => (
                <li key={subject}>{subject}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---- Scripture statement ---- */}
      <section className="section surface-slate statement">
        <div className="container reveal">
          <figure>
            <blockquote>
              {hero.verse.text}
              <cite>{hero.verse.cite}</cite>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* ---- Who we teach ---- */}
      <section id="ages" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{ages.eyebrow}</span>
            <h2>{ages.heading}</h2>
            <span className="lead">{ages.lead}</span>
          </div>

          <div className="cols cols--3 reveal">
            {ages.groups.map((group) => (
              <div key={group.name} className="col">
                <h3>{group.name}</h3>
                <span className="col__range caption">Ages {group.range}</span>
                <p className="col__body">{group.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Giving ---- */}
      <section id="give" className="section surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{give.eyebrow}</span>
            <h2>{give.heading}</h2>
            <span className="lead">{give.lead}</span>
          </div>

          <div className="prose reveal" style={{ marginTop: '2rem' }}>
            <p>{give.body}</p>
          </div>

          <div className="cols cols--3 reveal">
            {give.methods.map((method) => (
              <div
                key={method.id}
                className={
                  method.available ? 'give-method' : 'give-method give-method--soon'
                }
              >
                <h3>{method.name}</h3>
                <p className="give-method__detail">{method.detail}</p>
                <p className="give-method__note">{method.note}</p>

                {method.href && method.cta ? (
                  <a
                    className="btn btn-ghost give-method__cta"
                    href={method.href}
                    {...(method.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {method.cta}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Contact ---- */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{contact.eyebrow}</span>
            <h2>{contact.heading}</h2>
            <span className="lead">{contact.lead}</span>
          </div>

          <div className="contact-grid">
            <div className="reveal">
              <div className="prose">
                <p>{contact.body}</p>
              </div>
              <a
                className="btn btn-primary"
                href={contact.emailHref}
                style={{ marginTop: '2rem' }}
              >
                {contact.emailCta}
              </a>
            </div>

            <dl className="detail-list reveal">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${school.email}`}>{school.email}</a>
                </dd>
              </div>
              <div>
                <dt>Where we meet</dt>
                <dd>
                  <a
                    href={school.meeting.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {school.meeting.venue}
                    <br />
                    {school.meeting.street}
                    <br />
                    {school.meeting.cityStateZip}
                  </a>
                </dd>
              </div>
              <div>
                <dt>When we meet</dt>
                <dd>
                  {school.meeting.day}, {school.meeting.season}
                  <br />
                  <span className="caption">
                    Arrival 9:00 a.m. · Assembly 9:30 · Dismissal 1:30 p.m.
                  </span>
                </dd>
              </div>
              <div>
                <dt>Directors</dt>
                <dd>
                  {school.directors.map((d) => d.name).join(' and ')}
                  <br />
                  <span className="caption">Co-Directors</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
