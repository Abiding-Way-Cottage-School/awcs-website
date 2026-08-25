import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { visit } from '@/content/join';

export const metadata = { title: 'Visit Us', description: visit.lead };

export default function VisitPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Visit Us"
        heading={visit.heading}
        lead={visit.lead}
        image={visit.image}
        parent={{ label: 'Join Us', href: '/join/' }}
      />

      <section className="section">
        <div className="container container--narrow prose reveal">
          {visit.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight surface-alt">
        <div className="container container--narrow">
          <span className="eyebrow reveal">How a visit works</span>
          <ul className="ruled-list numbered reveal" style={{ marginTop: '1.5rem' }}>
            {visit.steps.map((step) => (
              <li key={step.name}>
                <p className="item-title">{step.name}</p>
                <p className="item-body">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="section-head reveal">
            <span className="eyebrow">{visit.practical.eyebrow}</span>
            <h2>{visit.practical.heading}</h2>
          </div>
          <dl className="detail-list reveal" style={{ marginTop: '1.5rem' }}>
            {visit.practical.items.map((item) => (
              <div key={item.name}>
                <dt>{item.name}</dt>
                <dd>
                  {'href' in item && item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.body}
                    </a>
                  ) : (
                    item.body
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand
        heading={visit.cta.heading}
        body={visit.cta.body}
        primary={visit.cta.primary}
        surface="linen"
      />
    </SiteShell>
  );
}
