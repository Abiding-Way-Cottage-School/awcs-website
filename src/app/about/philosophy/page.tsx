import CtaBand from '@/components/CtaBand';
import Feature from '@/components/Feature';
import PageHeader from '@/components/PageHeader';
import PhotoBand from '@/components/PhotoBand';
import SiteShell from '@/components/SiteShell';
import { philosophy } from '@/content/about';
import { photo, quotes } from '@/content/site';

export const metadata = {
  title: 'Our Philosophy',
  description: philosophy.lead,
};

export default function PhilosophyPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our Philosophy"
        heading={philosophy.heading}
        lead={philosophy.lead}
        image={philosophy.image}
        parent={{ label: 'About', href: '/about/' }}
      />

      <section className="section">
        <div className="container container--narrow prose reveal">
          {philosophy.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Mason&rsquo;s three tools</span>
            <h2>Atmosphere, discipline, life.</h2>
          </div>
          <div className="def-grid def-grid--3 reveal">
            {philosophy.principles.map((p) => (
              <div key={p.name} className="def">
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand image={photo.mistyField} quote={quotes.bornPerson} />

      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{philosophy.practices.eyebrow}</span>
            <h2>{philosophy.practices.heading}</h2>
          </div>
          <div className="def-grid def-grid--3 reveal">
            {philosophy.practices.items.map((p) => (
              <div key={p.name} className="def">
                <h3>{p.name}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-alt">
        <div className="container reveal">
          <Feature
            eyebrow={philosophy.faith.eyebrow}
            heading={philosophy.faith.heading}
            body={philosophy.faith.body}
            image={philosophy.faith.image}
            imageShape="portrait"
            reverse
          />
        </div>
      </section>

      <CtaBand
        heading="See it in a real room."
        body="Reading about narration is not the same as watching a nine-year-old tell back a scene from Shakespeare."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        secondary={{ label: 'The feast', href: '/community/the-feast/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
