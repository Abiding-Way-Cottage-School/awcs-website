import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import SiteShell from '@/components/SiteShell';
import { story } from '@/content/about';

export const metadata = {
  title: 'Our Story',
  description: story.lead,
};

export default function StoryPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Our Story"
        heading={story.heading}
        lead={story.lead}
        image={story.image}
        parent={{ label: 'About', href: '/about/' }}
      />

      <section className="section">
        <div className="container container--narrow prose reveal">
          {story.opening.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      {story.sections.map((s, i) => (
        <section key={s.heading} className={i % 2 === 0 ? 'section surface-alt' : 'section'}>
          <div className="container container--narrow prose reveal">
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <section className="section-tight surface-alt statement">
        <div className="container container--narrow reveal">
          <p className="statement__text">{story.closing}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container gallery reveal">
          {/* The first frame runs the full width on a phone and the other two
              sit beside each other under it, so the run reads as an
              arrangement rather than as three squares in a queue. */}
          {story.gallery.map((src, i) => (
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

      <CtaBand
        heading="Add your family to it."
        body="We remain small on purpose, and there is usually room for one more."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        secondary={{ label: 'How to apply', href: '/join/apply/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
