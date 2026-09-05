import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import PhotoBand from '@/components/PhotoBand';
import SiteShell from '@/components/SiteShell';
import { experience } from '@/content/community';
import { photo } from '@/content/site';

export const metadata = {
  title: 'The Abiding Way Experience',
  description: experience.lead,
};

export default function ExperiencePage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="The Abiding Way Experience"
        heading={experience.heading}
        lead={experience.lead}
        image={experience.image}
        parent={{ label: 'Our Community', href: '/community/' }}
      />

      <section className="section">
        <div className="container container--narrow prose reveal">
          {experience.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="container gallery reveal">
          {/* The first frame runs the full width on a phone and the other two
              sit beside each other under it, so the run reads as an
              arrangement rather than as three squares in a queue. */}
          {experience.gallery.map((src, i) => (
            <Photo
              key={src}
              src={src}
              shape="square"
              sizes={
                i === 0
                  ? '(min-width: 52rem) 30vw, 100vw'
                  : '(min-width: 52rem) 30vw, 50vw'
              }
            />
          ))}
        </div>
      </section>

      <section className="section surface-alt">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{experience.marks.eyebrow}</span>
            <h2>{experience.marks.heading}</h2>
          </div>
          <div className="def-grid def-grid--3 reveal">
            {experience.marks.items.map((m) => (
              <div key={m.name} className="def">
                <h3>{m.name}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhotoBand image={photo.heroPath} quote={experience.quote} />

      <CtaBand
        heading="It is easier to see than to describe."
        body="Come for a Wednesday morning and watch it happen."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        secondary={{ label: 'A day at Abiding Way', href: '/community/a-day/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
