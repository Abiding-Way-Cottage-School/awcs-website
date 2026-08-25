import CardGrid from '@/components/CardGrid';
import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { aboutIndex } from '@/content/about';

export const metadata = {
  title: 'About',
  description: aboutIndex.lead,
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow={aboutIndex.eyebrow}
        heading={aboutIndex.heading}
        lead={aboutIndex.lead}
        image={aboutIndex.image}
      />
      <section className="section">
        <div className="container reveal">
          <CardGrid cards={aboutIndex.cards} columns={3} />
        </div>
      </section>
      <CtaBand
        heading="Come and see for yourself."
        body="Almost every family decides after a Wednesday morning rather than from a website."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
