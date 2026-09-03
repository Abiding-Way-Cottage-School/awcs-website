import Link from 'next/link';

import CardGrid from '@/components/CardGrid';
import CtaBand from '@/components/CtaBand';
import Feature from '@/components/Feature';
import Photo from '@/components/Photo';
import PhotoBand from '@/components/PhotoBand';
import SiteShell from '@/components/SiteShell';
import { givingMethods, home } from '@/content/home';
import { atmosphereWords, commitments, photo, quotes, school } from '@/content/site';

export default function HomePage() {
  const [firstLine, secondLine] = school.nameLines;

  return (
    <SiteShell>
      {/* ---- Hero: a light editorial split rather than a dark cover ---- */}
      <section className="hero">
        <div className="hero__grid">
          <div className="hero__text">
            <div className="hero__inner">
              <p className="eyebrow">{home.hero.eyebrow}</p>

              <h1 className="hero-title display">
                {firstLine}
                <em>{secondLine}</em>
              </h1>

              <p className="hero__tagline">{home.hero.tagline}</p>
              <p className="hero__lead">{home.hero.lead}</p>

              <div className="hero__actions">
                <Link className="btn btn-primary" href={home.hero.primary.href}>
                  {home.hero.primary.label}
                </Link>
                <Link className="btn btn-ghost" href={home.hero.secondary.href}>
                  {home.hero.secondary.label}
                </Link>
              </div>
            </div>
          </div>

          <div className="hero__photo">
            <Photo
              src={home.hero.image}
              shape="fill"
              priority
              sizes="(min-width: 60rem) 52vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ---- Welcome ---- */}
      <section className="section">
        <div className="container reveal">
          <Feature
            eyebrow={home.welcome.eyebrow}
            heading={home.welcome.heading}
            lead={home.welcome.lead}
            body={home.welcome.body}
            image={home.welcome.image}
            imageShape="portrait"
            link={home.welcome.link}
            reverse
          />
        </div>
      </section>

      {/* ---- Three pillars ---- */}
      <section className="section surface-alt">
        <div className="container">
          <div className="section-head section-head--center reveal">
            <span className="eyebrow">{home.pillars.eyebrow}</span>
            <h2>{home.pillars.heading}</h2>
          </div>

          <div className="reveal" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <CardGrid
              columns={3}
              cards={home.pillars.items.map((p) => ({
                name: p.name,
                body: p.body,
                href: p.href,
                image: p.image,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ---- Truth · Beauty · Goodness ---- */}
      <section className="section-tight surface-linen band">
        <div className="container reveal">
          <span className="eyebrow">{home.atmosphere.eyebrow}</span>
          <p className="band__words">
            {atmosphereWords.map((word, i) => (
              <span key={word}>
                {i > 0 && <span className="band__sep" aria-hidden="true">·</span>}
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ---- The day ---- */}
      <section className="section">
        <div className="container reveal">
          <Feature
            eyebrow={home.day.eyebrow}
            heading={home.day.heading}
            lead={home.day.lead}
            body={[home.day.body]}
            image={home.day.image}
            imageShape="landscape"
            link={home.day.link}
          />
        </div>
      </section>

      {/* ---- The six commitments ---- */}
      <section className="section surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Our six commitments</span>
            <h2>What we hold to.</h2>
          </div>

          <div className="def-grid def-grid--3 reveal">
            {commitments.map((c) => (
              <div key={c.name} className="def">
                <h3>{c.name}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Scripture over a photograph ---- */}
      <PhotoBand image={photo.fieldGolden} quote={quotes.john15} />

      {/* ---- Giving ---- */}
      <section id="give" className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{home.give.eyebrow}</span>
            <h2>{home.give.heading}</h2>
            <span className="lead">{home.give.lead}</span>
          </div>

          <div className="prose reveal" style={{ marginTop: '1.75rem' }}>
            <p>{home.give.body}</p>
          </div>

          <div className="cards cards--3 reveal" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            {givingMethods.map((method) => (
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

      {/* ---- Come and see ---- */}
      <CtaBand
        eyebrow={home.visit.eyebrow}
        heading={home.visit.heading}
        body={home.visit.body}
        primary={home.visit.primary}
        secondary={home.visit.secondary}
        surface="linen"
      />
    </SiteShell>
  );
}
