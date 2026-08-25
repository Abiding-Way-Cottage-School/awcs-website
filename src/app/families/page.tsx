import CardGrid from '@/components/CardGrid';
import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { familiesIndex } from '@/content/families';

export const metadata = { title: 'Families', description: familiesIndex.lead };

export default function FamiliesPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow={familiesIndex.eyebrow}
        heading={familiesIndex.heading}
        lead={familiesIndex.lead}
        image={familiesIndex.image}
      />
      <section className="section">
        <div className="container reveal">
          <CardGrid cards={familiesIndex.cards} columns={4} />
        </div>
      </section>
      <CtaBand
        heading="Still have a question?"
        body="Ask us directly. A real answer to your family's actual question beats any page we could write."
        primary={{ label: 'Read the FAQ', href: '/families/faq/' }}
        secondary={{ label: 'Plan a visit', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
