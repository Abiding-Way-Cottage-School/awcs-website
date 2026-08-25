import CtaBand from '@/components/CtaBand';
import Feature from '@/components/Feature';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { forMothers } from '@/content/community';

export const metadata = {
  title: 'For Mothers',
  description: forMothers.lead,
};

export default function ForMothersPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="For Mothers"
        heading={forMothers.heading}
        lead={forMothers.lead}
        image={forMothers.image}
        parent={{ label: 'Our Community', href: '/community/' }}
      />

      <section className="section">
        <div className="container container--narrow prose reveal">
          {forMothers.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{forMothers.asks.eyebrow}</span>
            <h2>{forMothers.asks.heading}</h2>
          </div>
          <div className="def-grid def-grid--2 reveal">
            {forMothers.asks.items.map((item) => (
              <div key={item.name} className="def">
                <h3>{item.name}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container reveal">
          <Feature
            eyebrow={forMothers.gives.eyebrow}
            heading={forMothers.gives.heading}
            body={forMothers.gives.body}
            image={forMothers.gives.image}
            imageShape="portrait"
            reverse
          />
        </div>
      </section>

      <section className="section-tight surface-slate statement">
        <div className="container reveal">
          <blockquote>
            {forMothers.quote.text}
            <cite>{forMothers.quote.cite}</cite>
          </blockquote>
        </div>
      </section>

      <CtaBand
        heading="You would be welcome here."
        body="Come and meet the other mothers before you decide anything."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
