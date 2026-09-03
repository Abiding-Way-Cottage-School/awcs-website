import { mailto, photo, school } from './site';

export const home = {
  hero: {
    // A sentence rather than school.tagline's small-caps label: the hero has the
    // room for it, and it says what the co-op is to someone who has never heard
    // of Charlotte Mason. school.tagline still carries the page titles.
    lead: 'A Christ-centered Charlotte Mason enrichment community for homeschooling families.',
    /** Two lines of facts under the sentence; each inner array is one line, joined with a dot. */
    facts: [
      [school.meeting.day, school.meeting.hours, school.city],
      ['Ages 6–11', 'Kinderleben', 'Mother-led'],
    ],
    image: photo.childrenTogether,
    primary: { label: 'Visit us', href: '/join/visit/' },
    secondary: { label: 'Our philosophy', href: '/about/philosophy/' },
  },

  welcome: {
    eyebrow: 'Welcome',
    heading: 'A quiet place to learn together.',
    lead: 'We are mothers teaching our own children, and gladly sharing the work.',
    body: [
      'Abiding Way Cottage School is a Christ-centered Charlotte Mason enrichment community for homeschooling families in Jacksonville. We meet one day each week to share the subjects that are especially rich when experienced together — Shakespeare read aloud in a room full of voices, a folk dance that needs more than one pair of feet, a painting looked at slowly and then described from memory.',
      'Every family participates. We teach, assist, and carry the day together, creating a small, beautiful community where children learn alongside one another and mothers don’t have to carry the work alone.',
    ],
    image: photo.handInHand,
    link: { label: 'Read our story', href: '/about/story/' },
  },

  /** The three pillars, each linking into the section that explains it. */
  pillars: {
    eyebrow: 'What we are about',
    heading: 'Three things we will not hurry.',
    items: [
      {
        name: 'A living education',
        body: 'Whole books by authors who loved their subject, and narration instead of worksheets. The child does the work of knowing.',
        href: '/about/philosophy/',
        linkLabel: 'Our philosophy',
        image: photo.childStudying,
      },
      {
        name: 'A generous feast',
        body: 'A rich feast of living ideas through Shakespeare, poetry, literature, music, art, language, movement, and handicrafts.',
        href: '/community/the-feast/',
        linkLabel: 'The feast',
        image: photo.watercolorSet,
      },
      {
        name: 'Mothers, together',
        body: 'This is a co-op, not a drop-off. We teach beside each other and are better for the company.',
        href: '/community/for-mothers/',
        linkLabel: 'For mothers',
        image: photo.dancingCircle,
      },
    ],
  },

  atmosphere: {
    eyebrow: 'The atmosphere we keep',
    image: photo.lightWall,
  },

  day: {
    eyebrow: 'A day at Abiding Way',
    heading: 'One day a week, unhurried.',
    lead: `${school.meeting.day} • ${school.meeting.hours} • ${school.meeting.season}`,
    body: [
      'Our Wednesdays begin together with assembly, followed by short lessons in small mixed-age groups, a shared lunch, and afternoon studies.',
      'Throughout the year, our children enjoy a generous Charlotte Mason feast including:',
    ],
    subjects: [
      'Shakespeare',
      'Poetry',
      'Literature & Narration',
      'Spanish',
      'Picture Study',
      'Composer Study',
      'Handicrafts',
      'Folk Dance',
      'Swedish Drill',
    ],
    after:
      'Each subject is approached through living ideas, beautiful materials, short lessons, and attentive participation.',
    image: photo.knittingHands,
    link: { label: 'See the full day', href: '/community/a-day/' },
  },

  give: {
    eyebrow: 'Support the school',
    heading: 'Giving keeps the door open.',
    lead: 'Gifts go to books, art supplies, and the room we meet in.',
    body: 'We are a small parent-run co-op, and a gift of any size does real work here — a set of living books for the shared shelf, watercolors and clay for handicrafts, or a family’s tuition quietly covered.',
    image: photo.bowlLinen,
  },

  visit: {
    eyebrow: 'Come and see',
    heading: 'You are welcome to visit.',
    lead: 'Come for a Wednesday morning and see whether this is home.',
    body: 'The best way to understand a co-op is to stand in the middle of one. Write to us and we will find a Wednesday that suits your family.',
    image: photo.fieldGolden,
    primary: { label: 'Plan a visit', href: '/join/visit/' },
    secondary: { label: 'Email the directors', href: mailto('Hello from a prospective family') },
  },
};

export type GivingMethod = {
  id: string;
  name: string;
  detail: string;
  note: string;
  href: string | null;
  cta: string | null;
  available: boolean;
};

/**
 * Ways to give. Add an entry and every giving section renders it; no other file
 * needs to change. `available: false` renders a method as coming soon.
 * Card and recurring giving need a server — see docs/ROADMAP.md.
 */
export const givingMethods: GivingMethod[] = [
  {
    id: 'venmo',
    name: 'Venmo',
    detail: school.venmoHandle,
    note: 'The simplest way to give today. Please add a note saying what the gift is for.',
    href: school.venmoUrl,
    cta: 'Give with Venmo',
    available: true,
  },
  {
    id: 'card',
    name: 'Card or bank transfer',
    detail: 'Coming soon',
    note: 'We are setting up online giving by card, including recurring monthly support.',
    href: null,
    cta: null,
    available: false,
  },
  {
    id: 'other',
    name: 'Another way to give',
    detail: 'By arrangement',
    note: 'A check, a gift of books or materials, or a matching gift through your employer.',
    href: mailto('Giving to Abiding Way Cottage School'),
    cta: 'Write to us',
    available: true,
  },
];
