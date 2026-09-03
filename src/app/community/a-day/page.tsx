import CtaBand from '@/components/CtaBand';
import PageHeader from '@/components/PageHeader';
import SiteShell from '@/components/SiteShell';
import { aDay } from '@/content/community';
import { school } from '@/content/site';

export const metadata = {
  title: 'A Day at Abiding Way',
  description: aDay.intro,
};

export default function ADayPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="A Day at Abiding Way"
        heading={aDay.heading}
        lead={aDay.lead}
        image={aDay.image}
        parent={{ label: 'Our Community', href: '/community/' }}
      />

      <section className="section">
        <div className="container">
          <p className="prose reveal">{aDay.intro}</p>

          <ol className="schedule reveal" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
            {aDay.schedule.map((slot) => (
              <li key={slot.time}>
                <span className="schedule__time">{slot.time}</span>
                <span className="schedule__label">{slot.label}</span>
                <span className="schedule__note">{slot.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-tight surface-alt">
        <div className="container container--narrow reveal">
          <span className="eyebrow">{aDay.rooms.eyebrow}</span>
          <h2 style={{ marginTop: '1.25rem' }}>{aDay.rooms.heading}</h2>
          <p className="prose" style={{ marginTop: '1.25rem' }}>
            {aDay.rooms.body}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow reveal">
          <span className="eyebrow">{aDay.bring.eyebrow}</span>
          <h2 style={{ marginTop: '1.25rem' }}>{aDay.bring.heading}</h2>
          <ul className="marker-list" style={{ marginTop: '1.25rem' }}>
            {aDay.bring.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="caption" style={{ marginTop: '1.5rem' }}>
            We meet at {school.meeting.venue}, {school.meeting.street},{' '}
            {school.meeting.cityStateZip}.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Join us for one."
        body="Arrive at half past nine with the rest of us and stay through lunch."
        primary={{ label: 'Plan a visit', href: '/join/visit/' }}
        surface="linen"
      />
    </SiteShell>
  );
}
