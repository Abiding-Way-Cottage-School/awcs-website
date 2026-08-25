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
          {story.body.slice(0, 2).map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight surface-alt statement">
        <div className="container container--narrow reveal">
          <blockquote>
            {story.pullQuote.text}
            <cite>{story.pullQuote.cite}</cite>
          </blockquote>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow prose reveal">
          {story.body.slice(2).map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight">
        <div className="container cards cards--3 reveal">
          {story.gallery.map((src) => (
            <Photo key={src} src={src} shape="square" sizes="(min-width: 52rem) 30vw, 100vw" />
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
