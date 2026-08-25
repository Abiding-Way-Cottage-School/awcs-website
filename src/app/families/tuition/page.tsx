import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { tuition } from '@/content/families';

export const metadata = { title: 'Tuition & Fees', description: tuition.lead };

export default function TuitionPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Tuition & Fees"
        heading={tuition.heading}
        lead={tuition.lead}
        image={tuition.image}
        parent={{ label: 'Families', href: '/families/' }}
      />

      <section className="section">
        <div className="container">
          <div className="prose reveal">
            {tuition.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>

          <p className="draft-notice reveal" style={{ marginTop: '2rem', maxWidth: 'var(--measure)' }}>
            <span>{tuition.approximateNote}</span>
          </p>

          <div className="reveal" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {tuition.fees.map((fee) => (
              <div key={fee.name} className="fee">
                <div>
                  <h3>{fee.name}</h3>
                  <p className="fee__body">{fee.body}</p>
                </div>
                <div className="fee__figure">
                  <span className="fee__amount">{fee.amount}</span>
                  <span className="fee__unit">{fee.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-alt">
        <div className="container">
          <div className="def-grid def-grid--2 reveal" style={{ marginTop: 0 }}>
            <div className="def">
              <span className="eyebrow">{tuition.included.eyebrow}</span>
              <h3 style={{ marginTop: '0.75rem' }}>{tuition.included.heading}</h3>
              <ul className="marker-list" style={{ marginTop: '0.75rem' }}>
                {tuition.included.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="def">
              <span className="eyebrow">{tuition.notIncluded.eyebrow}</span>
              <h3 style={{ marginTop: '0.75rem' }}>{tuition.notIncluded.heading}</h3>
              <ul className="marker-list" style={{ marginTop: '0.75rem' }}>
                {tuition.notIncluded.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={tuition.help.eyebrow}
        heading={tuition.help.heading}
        body={tuition.help.body}
        primary={tuition.help.cta}
        surface="linen"
      />
    </SiteShell>
  );
}
