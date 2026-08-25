import { mailto, photo, school } from './site';

export const familiesIndex = {
  eyebrow: 'Families',
  heading: 'The practical questions.',
  lead: 'Who the co-op is for, what it costs, when we meet, and everything else you are wondering.',
  image: photo.bookPages,
  cards: [
    {
      name: "Who It's For",
      body: 'The ages we teach and the families who tend to be at home here.',
      href: '/families/who-its-for/',
      image: photo.childReading,
    },
    {
      name: 'Tuition & Fees',
      body: 'What enrollment costs and what it covers.',
      href: '/families/tuition/',
      image: photo.bowlLinen,
    },
    {
      name: 'FAQ',
      body: 'The questions we are asked most often, answered plainly.',
      href: '/families/faq/',
      image: photo.driedGrass,
    },
    {
      name: 'Calendar',
      body: 'Term dates, breaks, and the days that matter.',
      href: '/families/calendar/',
      image: photo.mistyField,
    },
  ],
};

export const whoItsFor = {
  eyebrow: "Who it's for",
  heading: 'Three rooms, one household.',
  lead: 'Younger children are cared for so their mothers can teach.',
  image: photo.childReading,
  intro:
    'We take children from birth through about eleven, in three groups. Siblings are welcome across all of them — no mother has to choose between teaching a lesson and caring for her toddler.',
  groups: [
    {
      name: 'Nursery',
      range: '2 & under',
      body: 'Warm, quiet care for the youngest, held close while the older children study. Staffed by mothers in rotation.',
      image: photo.bowlLinen,
    },
    {
      name: 'Kinderleben',
      range: '3 – 5',
      body: 'The children’s life: songs, stories, handwork and a great deal of time outdoors. Nothing is rushed and nothing is formal. Mason would not have had them at lessons at all, and neither do we.',
      image: photo.woolBasket,
    },
    {
      name: 'Main Subjects',
      range: '6 – 11',
      body: 'The full feast — Shakespeare, poetry, picture study, composer study, handicrafts, drill and dance — all met with narration.',
      image: photo.bookPages,
    },
  ],
  fit: {
    eyebrow: 'Is this a good fit?',
    heading: 'Families who are at home here.',
    /* DRAFT — an honest characterisation, but review the tone with leadership.
       The "not a fit" list is deliberately included: it saves everyone time. */
    good: [
      'You homeschool, and you want one day a week of things that are better done together.',
      'You are drawn to Charlotte Mason, even if you are new to her and still working it out.',
      'You are glad for Christ to be at the center of the day rather than off to one side.',
      'You can be present on Wednesdays and take a real part in the work.',
    ],
    less: [
      'You are looking for childcare or a drop-off program. Every parent stays and serves.',
      'You want a graded, tested, worksheet-driven curriculum. That is a good thing; it is not this thing.',
      'Wednesdays cannot work for your family this year. Consistency is most of what makes a co-op function.',
    ],
  },
  cta: {
    heading: 'Not sure?',
    body: 'Most families decide after a visit rather than from a website. Come for a Wednesday morning.',
    primary: { label: 'Plan a visit', href: '/join/visit/' },
  },
};

export const tuition = {
  eyebrow: 'Tuition & fees',
  heading: 'What it costs, and why.',
  lead: 'A co-op is inexpensive because the parents do the work.',
  image: photo.bowlLinen,
  intro: [
    'There is no staff to pay here. Every lesson is taught by a parent, which is why a year at Abiding Way costs about what a single month of a commercial program would. What you pay for is the room, the shared materials, and the things a co-op cannot make itself.',
  ],
  /* Figures are from the 2026-2027 Family Handbook. They are shown as approximate
     and confirmed at enrollment, per leadership's preference — update `note` and
     the amounts here if the fee schedule changes. */
  approximateNote:
    'Figures below are approximate and are confirmed at enrollment. Please write to us if cost is the only thing standing between your family and a place here.',
  fees: [
    {
      name: 'Enrollment',
      amount: '$300',
      unit: 'per family, per year',
      body: 'Covers the room, shared books and materials, art and handicraft supplies, and the running of the co-op. One fee per family, however many children you bring.',
    },
    {
      name: 'Background check',
      amount: '$25',
      unit: 'per adult, one time',
      body: 'Every adult who serves at co-op is checked. A small cost and a plain kindness to every family here.',
    },
    {
      name: 'Uniform shirt',
      amount: '$15 – $18',
      unit: 'per shirt',
      body: 'A simple co-op t-shirt: $15 for a child’s, $18 for an adult’s. Worn on field days and for group photographs.',
    },
  ],
  included: {
    eyebrow: 'What enrollment covers',
    heading: 'Included in the fee.',
    items: [
      'Use of the room at Reach Church for the full year',
      'Shared living books for the co-op shelf',
      'Art, handicraft and nature study materials',
      'Picture study prints and composer recordings',
      'Nursery and Kinderleben care while you teach',
    ],
  },
  notIncluded: {
    eyebrow: 'Not included',
    heading: 'What families provide.',
    /* DRAFT — a reasonable list. Confirm with leadership before publishing. */
    items: [
      'Your own family’s home curriculum for the other four days',
      'A packed lunch each Wednesday',
      'A nature notebook and pencils',
      'Occasional handicraft materials for a specific project',
    ],
  },
  help: {
    eyebrow: 'If cost is the obstacle',
    heading: 'Please ask.',
    body: 'We would rather have your family here than have the fee. Gifts from other families quietly cover places every year, and no one is told whose. Write to the directors and it will be handled discreetly.',
    cta: { label: 'Write to the directors', href: mailto('A question about tuition') },
  },
};

export const faq = {
  eyebrow: 'FAQ',
  heading: 'Questions we are asked.',
  lead: 'And the plainest answers we can give.',
  image: photo.driedGrass,
  /* DRAFT — answers marked below are reasoned from the handbook rather than quoted
     from it. Every one should be confirmed by leadership before it is relied on.
     The meeting times, location, ages, subjects and fees are handbook facts. */
  groups: [
    {
      name: 'The basics',
      items: [
        {
          q: 'When and where do you meet?',
          a: `${school.meeting.day}, ${school.meeting.season}. Arrival is at ${school.meeting.arrival}, assembly at ${school.meeting.assembly}, and dismissal at ${school.meeting.dismissal}. We meet at ${school.meeting.venue}, ${school.meeting.street}, ${school.meeting.cityStateZip}.`,
        },
        {
          q: 'What ages do you take?',
          a: 'Birth through about eleven, in three groups: Nursery for two and under, Kinderleben for three to five, and Main Subjects for six to eleven. Siblings are welcome across all three.',
        },
        {
          q: 'Do I stay for the day?',
          a: 'Yes. Abiding Way is a parent-participation co-op, not a drop-off program. Every family takes a role — teaching, assisting, nursery, or the practical work of the day.',
        },
        {
          q: 'Do I have to be a Charlotte Mason expert?',
          a: 'Not at all. A good many of our families arrived curious rather than convinced. Come and see how it works in a real room; that teaches more than reading about it.',
        },
      ],
    },
    {
      name: 'Faith',
      items: [
        {
          q: 'What do you believe?',
          a: 'Abiding Way is Christ-centered. Scripture is read, hymns are sung, and every subject is treated as belonging to God already. Families come to us from many different churches.',
        },
        {
          q: 'Do we have to attend a particular church?',
          a: 'No. We ask that families are glad for Christ to be at the center of the day rather than off to one side of it, but we are not tied to one congregation.',
        },
      ],
    },
    {
      name: 'Practicalities',
      items: [
        {
          q: 'What does it cost?',
          a: 'Roughly $300 per family for the year, plus a $25 background check for each adult and a uniform shirt at $15 to $18. Figures are approximate and confirmed at enrollment. If cost is the obstacle, please write to us.',
        },
        {
          q: 'How do you communicate during the year?',
          a: `Day to day communication happens through the ${school.communicationApp} app once a family has joined. Before that, email is the best way to reach us.`,
        },
        {
          q: 'Can we join mid-year?',
          a: 'Sometimes, depending on space and the point in the term. Write to the directors and ask — it costs nothing to find out.',
        },
        {
          q: 'What if my child has additional needs?',
          a: 'Tell us about them. We are a small co-op run by parents, so we cannot promise specialist provision, but we would much rather have an honest conversation early than turn a family away by silence.',
        },
      ],
    },
  ],
  cta: {
    heading: 'Still wondering?',
    body: 'Ask us directly. A real answer to your family’s actual question is worth more than any page we could write.',
    primary: { label: 'Email the directors', href: mailto('A question about Abiding Way') },
  },
};

export const calendar = {
  eyebrow: 'Calendar',
  heading: 'Dates for the year.',
  lead: `${school.meeting.day}, ${school.meeting.season}.`,
  image: photo.mistyField,
  /* DRAFT — this is placeholder structure, not the real calendar. Nothing here is
     from the handbook. Replace every row with the actual 2026-2027 dates before
     families rely on it. The page shows a visible notice until this is done. */
  isDraft: true,
  terms: [
    {
      name: 'Fall term',
      window: 'September – December',
      items: [
        { date: 'Early September', label: 'First Wednesday', note: 'Term begins with assembly and a shared lunch.' },
        { date: 'Late November', label: 'Thanksgiving break', note: 'No co-op.' },
        { date: 'Mid December', label: 'Last Wednesday of the term', note: 'Handicraft exhibition and carols.' },
      ],
    },
    {
      name: 'Spring term',
      window: 'January – May',
      items: [
        { date: 'Early January', label: 'Term resumes', note: '' },
        { date: 'Spring', label: 'Spring break', note: 'No co-op.' },
        { date: 'May', label: 'Closing day', note: 'Recitations, exhibition of work, and a picnic.' },
      ],
    },
  ],
  note: 'Enrolled families receive the full dated calendar, and any changes to it, through the BAND app.',
};
