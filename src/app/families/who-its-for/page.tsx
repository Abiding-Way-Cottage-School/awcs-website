import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import SiteShell from '@/components/SiteShell';
import { whoItsFor } from '@/content/families';

export const metadata = { title: "Who It's For", description: whoItsFor.lead };

export default function WhoItsForPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Who It's For"
        heading={whoItsFor.heading}
        lead={whoItsFor.lead}
        image={whoItsFor.image}
        parent={{ label: 'Families', href: '/families/' }}
      />

      <section className="section">
        <div className="container">
          <p className="prose reveal">{whoItsFor.intro}</p>

          <div className="cards cards--3 reveal" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            {whoItsFor.groups.map((group) => (
              <div key={group.name}>
                <Photo src={group.image} shape="landscape" sizes="(min-width: 52rem) 30vw, 100vw" />
                <h3 style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                  {group.name}
                </h3>
                <p className="eyebrow" style={{ marginTop: '0.5rem' }}>
                  Ages {group.range}
                </p>
                <p className="item-body">{group.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{whoItsFor.fit.eyebrow}</span>
            <h2>{whoItsFor.fit.heading}</h2>
          </div>

          <div className="def-grid def-grid--2 reveal">
            <div className="def">
              <h3>This is probably for you if…</h3>
              <ul className="marker-list" style={{ marginTop: '0.75rem' }}>
                {whoItsFor.fit.good.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="def">
              <h3>It may not be, if…</h3>
              <ul className="marker-list" style={{ marginTop: '0.75rem' }}>
                {whoItsFor.fit.less.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading={whoItsFor.cta.heading}
        body={whoItsFor.cta.body}
        primary={whoItsFor.cta.primary}
        surface="linen"
      />
    </SiteShell>
  );
}
