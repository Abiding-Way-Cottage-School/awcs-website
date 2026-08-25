import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { faq } from '@/content/families';

export const metadata = { title: 'FAQ', description: faq.lead };

export default function FaqPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="FAQ"
        heading={faq.heading}
        lead={faq.lead}
        image={faq.image}
        parent={{ label: 'Families', href: '/families/' }}
      />

      <section className="section">
        <div className="container container--narrow">
          {faq.groups.map((group) => (
            <div key={group.name} className="faq-group reveal">
              <span className="eyebrow">{group.name}</span>
              <div className="faq-list">
                {group.items.map((item) => (
                  <details key={item.q} className="faq-item">
                    <summary>{item.q}</summary>
                    <p className="faq-item__answer">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        heading={faq.cta.heading}
        body={faq.cta.body}
        primary={faq.cta.primary}
        surface="linen"
      />
    </SiteShell>
  );
}
