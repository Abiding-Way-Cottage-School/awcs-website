import CardGrid from '@/components/CardGrid';
import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { joinIndex } from '@/content/join';

export const metadata = { title: 'Join Us', description: joinIndex.lead };

export default function JoinPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow={joinIndex.eyebrow}
        heading={joinIndex.heading}
        lead={joinIndex.lead}
        image={joinIndex.image}
      />
      <section className="section">
        <div className="container reveal">
          <CardGrid cards={joinIndex.cards} columns={2} />
        </div>
      </section>
      <CtaBand
        heading="Write to us."
        body="Tell us a little about your family and the ages of your children."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        secondary={{ label: 'How to apply', href: '/join/apply/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
