import { mailto, photo, school } from './site';

export const home = {
  hero: {
    eyebrow: school.city,
    tagline: school.tagline,
    lead: school.motto,
    image: photo.childrenTogether,
    primary: { label: 'Visit us', href: '/join/visit/' },
    secondary: { label: 'Our philosophy', href: '/about/philosophy/' },
  },

  welcome: {
    eyebrow: 'Welcome',
    heading: 'A quiet place to learn together.',
    lead: 'We are mothers teaching our own children, and gladly sharing the work.',
    body: [
      'Abiding Way Cottage School is a Christ-centered enrichment co-op for homeschooling families in Jacksonville. We meet one day a week to study the things that are hard to do alone — Shakespeare read aloud in a room full of voices, a folk dance that needs more than one pair of feet, a painting looked at slowly and then described from memory.',
      'Every family participates. Parents teach, assist, and carry the day together, which is what keeps the co-op small, affordable, and unmistakably ours.',
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
        body: 'Shakespeare, poetry, picture study, composer study, handicrafts, folk dance and drill — spread wide and offered freely.',
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
    lead: `${school.meeting.day}, ${school.meeting.season}.`,
    body: 'Arrival at nine, assembly at half past, morning lessons in small mixed-age groups, lunch outdoors when the weather allows, and afternoon studies before we go home again at half past one.',
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
