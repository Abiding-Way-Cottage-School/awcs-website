import CardGrid from '@/components/CardGrid';
import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { communityIndex } from '@/content/community';

export const metadata = {
  title: 'Our Community',
  description: communityIndex.lead,
};

export default function CommunityPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow={communityIndex.eyebrow}
        heading={communityIndex.heading}
        lead={communityIndex.lead}
        image={communityIndex.image}
      />
      <section className="section">
        <div className="container reveal">
          <CardGrid cards={communityIndex.cards} columns={4} />
        </div>
      </section>
      <CtaBand
        heading="Spend a Wednesday with us."
        body="Bring your children, stay for the morning, and ask anything."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
