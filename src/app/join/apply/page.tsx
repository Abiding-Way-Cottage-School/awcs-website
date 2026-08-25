import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { apply } from '@/content/join';

export const metadata = { title: 'Apply', description: apply.lead };

export default function ApplyPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Apply"
        heading={apply.heading}
        lead={apply.lead}
        image={apply.image}
        parent={{ label: 'Join Us', href: '/join/' }}
      />

      <section className="section">
        <div className="container container--narrow">
          <div className="prose reveal">
            {apply.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <ul className="ruled-list numbered reveal" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {apply.steps.map((step) => (
              <li key={step.name}>
                <p className="item-title">{step.name}</p>
                <p className="item-body">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight surface-alt">
        <div className="container container--narrow panel panel--outline reveal">
          <span className="eyebrow">{apply.portalNote.eyebrow}</span>
          <h2 style={{ marginTop: '1rem' }}>{apply.portalNote.heading}</h2>
          <p className="prose" style={{ marginTop: '1rem' }}>
            {apply.portalNote.body}
          </p>
        </div>
      </section>

      <CtaBand
        heading={apply.cta.heading}
        body={apply.cta.body}
        primary={apply.cta.primary}
        secondary={apply.cta.secondary}
        surface="linen"
      />
    </SiteShell>
  );
}
