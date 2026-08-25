import CtaBand from '@/components/CtaBand';
import Feature from '@/components/Feature';
import PageHeader from '@/components/PageHeader';
import PhotoBand from '@/components/PhotoBand';
import SiteShell from '@/components/SiteShell';
import { theFeast } from '@/content/community';

export const metadata = {
  title: 'The Feast',
  description: theFeast.lead,
};

export default function TheFeastPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="The Feast"
        heading={theFeast.heading}
        lead={theFeast.lead}
        image={theFeast.image}
        parent={{ label: 'Our Community', href: '/community/' }}
      />

      <section className="section">
        <div className="container container--narrow prose reveal">
          {theFeast.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      {theFeast.groups.map((group, i) => (
        <section
          key={group.name}
          className={i % 2 === 1 ? 'section surface-alt' : 'section'}
        >
          <div className="container reveal">
            <Feature
              heading={group.name}
              image={group.image}
              imageShape="portrait"
              reverse={i % 2 === 1}
            >
              <ul className="ruled-list" style={{ marginTop: '1.75rem' }}>
                {group.subjects.map((s) => (
                  <li key={s.name}>
                    <p className="item-title">{s.name}</p>
                    <p className="item-body">{s.body}</p>
                  </li>
                ))}
              </ul>
            </Feature>
          </div>
        </section>
      ))}

      <PhotoBand image="/photos/field-golden.jpg" quote={theFeast.quote} />

      <CtaBand
        heading="Taste it on a Wednesday."
        body="The feast makes more sense in a room than on a list."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        secondary={{ label: 'Our philosophy', href: '/about/philosophy/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
