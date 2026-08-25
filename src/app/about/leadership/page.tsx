import CtaBand from '@/components/CtaBand';
import Feature from '@/components/Feature';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { leadership } from '@/content/about';
import { mailto } from '@/content/site';

export const metadata = {
  title: 'Our Leadership',
  description: leadership.lead,
};

export default function LeadershipPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our Leadership"
        heading={leadership.heading}
        lead={leadership.lead}
        image={leadership.image}
        parent={{ label: 'About', href: '/about/' }}
      />

      <section className="section">
        <div className="container container--narrow reveal">
          <p className="prose">{leadership.intro}</p>

          <ul className="ruled-list" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {leadership.people.map((person) => (
              <li key={person.name}>
                <p className="item-title">{person.name}</p>
                <p className="eyebrow" style={{ marginTop: '0.5rem' }}>
                  {person.role}
                </p>
                {person.bio ? <p className="item-body">{person.bio}</p> : null}
              </li>
            ))}
          </ul>

          <p style={{ marginTop: '2rem' }}>
            <a className="link-more" href={mailto('A question for the directors')}>
              Write to the directors
            </a>
          </p>
        </div>
      </section>

      <section className="section surface-alt">
        <div className="container reveal">
          <Feature
            eyebrow={leadership.join.eyebrow}
            heading={leadership.join.heading}
            body={[leadership.join.body]}
            image={leadership.join.image}
            imageShape="landscape"
            reverse
          />
        </div>
      </section>

      <CtaBand
        heading="Come and meet us."
        body="A Wednesday morning tells you more about a co-op than any page of biography."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
