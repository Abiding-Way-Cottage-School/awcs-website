import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { portal } from '@/content/join';

export const metadata = {
  title: 'Family Portal',
  description: portal.lead,
  // Nothing to index until there is a real portal behind a login.
  robots: { index: false, follow: true },
};

export default function PortalPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Family Portal"
        heading={portal.heading}
        lead={portal.lead}
        image={portal.image}
      />

      <section className="section">
        <div className="container container--narrow">
          <div className="prose reveal">
            {portal.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <div className="panel panel--linen reveal" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <span className="eyebrow">What it will hold</span>
            <ul className="marker-list" style={{ marginTop: '1rem' }}>
              {portal.planned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        heading={portal.cta.heading}
        body={portal.cta.body}
        primary={portal.cta.primary}
        surface="alt"
      />
    </SiteShell>
  );
}
