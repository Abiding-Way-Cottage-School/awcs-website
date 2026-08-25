import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { calendar } from '@/content/families';

export const metadata = { title: 'Calendar', description: calendar.lead };

export default function CalendarPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Calendar"
        heading={calendar.heading}
        lead={calendar.lead}
        image={calendar.image}
        parent={{ label: 'Families', href: '/families/' }}
      />

      <section className="section">
        <div className="container container--narrow">
          {calendar.isDraft ? (
            <p className="draft-notice reveal">
              <span>
                <strong>Dates below are placeholders.</strong> The 2026&ndash;2027 calendar
                has not been published here yet. Please write to us for the confirmed
                dates before making plans around them.
              </span>
            </p>
          ) : null}

          <div className="reveal" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {calendar.terms.map((term) => (
              <div key={term.name} className="term">
                <div className="term__head">
                  <h2>{term.name}</h2>
                  <span className="term__window">{term.window}</span>
                </div>
                {term.items.map((item) => (
                  <div key={item.label} className="term__item">
                    <span className="term__date">{item.date}</span>
                    <div>
                      <span className="item-title" style={{ fontSize: '1.125rem' }}>
                        {item.label}
                      </span>
                      {item.note ? <p className="term__note">{item.note}</p> : null}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="caption reveal" style={{ marginTop: '2rem' }}>
            {calendar.note}
          </p>
        </div>
      </section>

      <CtaBand
        heading="Need the confirmed dates?"
        body="Write to the directors and we will send you the current calendar."
        primary={{ label: 'Email the directors', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
