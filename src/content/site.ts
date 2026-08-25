/**
 * Every fact and every line of copy on the site lives here.
 *
 * This is the file to edit for a wording change, a new subject, a new way to
 * give, or a change of meeting time. Components read from it and never hold
 * copy of their own, so nobody has to read JSX to update the site.
 *
 * Facts are taken from the 2026-2027 Family Handbook. Two things are
 * deliberately absent because the handbook is a family document: leadership
 * phone numbers, and the fee and policy detail. Add them only once leadership
 * has said they may be public.
 */

export const school = {
  name: 'Abiding Way Cottage School',
  nameLines: ['Abiding Way', 'Cottage School'],
  tagline: 'A Charlotte Mason Enrichment Co-op',
  city: 'Jacksonville, Florida',
  description:
    "A Christ-centered, parent-participation homeschool co-op rooted in Charlotte Mason's philosophy.",
  motto:
    'Rooted in Christ, we grow in wisdom, delight in wonder, and glorify God in all things.',
  email: 'abidingwaycottageschool@gmail.com',
  venmoHandle: '@abidingwaycottageschool',
  venmoUrl: 'https://venmo.com/u/abidingwaycottageschool',
  meeting: {
    day: 'Wednesdays',
    season: 'September through May',
    venue: 'Reach Church',
    street: '4815-200 Executive Park Ct, Ste 200',
    cityStateZip: 'Jacksonville, FL 32216',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=4815-200+Executive+Park+Ct+Ste+200+Jacksonville+FL+32216',
  },
  directors: [
    { name: 'Lily Anderson', role: 'Co-Director' },
    { name: 'Bethany Lynch', role: 'Co-Director' },
  ],
};

const askUrl = (subject: string) =>
  'mailto:' + school.email + '?subject=' + encodeURIComponent(subject);

/** Nav links. Section pages get added here as the site grows past one page. */
export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Our Day', href: '#day' },
  { label: 'Ages', href: '#ages' },
  { label: 'Give', href: '#give' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'Jacksonville, Florida',
  verse: {
    text: 'Abide in me, and I in you…',
    cite: 'John 15:4',
  },
};

export const about = {
  eyebrow: 'About us',
  heading: 'A quiet place to learn together.',
  lead: 'We are mothers teaching our own children, and gladly sharing the work.',
  body: [
    'Abiding Way Cottage School is a Christ-centered enrichment co-op for homeschooling families in Jacksonville. We meet one day a week to study the things that are hard to do alone — Shakespeare read aloud in a room full of voices, a folk dance that needs more than one pair of feet, a painting looked at slowly and then described from memory.',
    'Our teaching follows Charlotte Mason, who understood a child as a born person rather than a vessel to be filled. So we set a wide feast of living books, of music and pictures and handicrafts, and we trust the child to take from it what nourishes. There are no worksheets here, and no busywork. We narrate, we attend, we go outdoors.',
    'Every family participates. Parents teach, assist, and carry the day together, which is what keeps the co-op small, affordable, and unmistakably ours. If you are weighing whether this is a good fit for your family, we would be glad to hear from you.',
  ],
  commitments: {
    eyebrow: 'Our six commitments',
    items: [
      'Christ at the center',
      'Living over lifeless',
      'Slow & thoughtful',
      'Habit as kindness',
      'Wonder protected',
      'Mothers, together',
    ],
  },
};

export const atmosphere = {
  eyebrow: 'The atmosphere we keep',
  words: ['Truth', 'Beauty', 'Goodness'],
};

export const day = {
  eyebrow: 'A day at co-op',
  heading: 'One day a week, unhurried.',
  lead: 'Wednesdays, September through May.',
  schedule: [
    { time: '9:00', label: 'Arrival', note: 'Families gather, coats and baskets down.' },
    { time: '9:30', label: 'Assembly', note: 'Hymn, Scripture, recitation, the day set before us.' },
    { time: '10:00', label: 'Morning lessons', note: 'Main subjects in small, mixed-age groups.' },
    { time: '12:00', label: 'Lunch together', note: 'Outdoors whenever the weather allows.' },
    { time: '12:30', label: 'Afternoon studies', note: 'Handicrafts, folk dance, drill and games.' },
    { time: '1:30', label: 'Dismissal', note: 'Home again, with something to tell.' },
  ],
  subjects: {
    eyebrow: 'What we study',
    items: [
      'Shakespeare',
      'Poetry',
      'Picture Study',
      'Music & Composer Study',
      'Handicrafts',
      'Folk Dance',
      'Swedish Drill',
      'Balance & Coordination',
      'Narration',
      'Spanish',
    ],
  },
};

export const ages = {
  eyebrow: 'Who we teach',
  heading: 'Three rooms, one household.',
  lead: 'Younger children are cared for so their mothers can teach.',
  groups: [
    {
      name: 'Nursery',
      range: '2 & under',
      body: 'Warm, quiet care for the youngest, held close while the older children study.',
    },
    {
      name: 'Kinderleben',
      range: '3 – 5',
      body: 'The children’s life: songs, stories, handwork and a great deal of time outdoors. Nothing is rushed and nothing is formal.',
    },
    {
      name: 'Main Subjects',
      range: '6 – 11',
      body: 'The full feast — Shakespeare, poetry, picture study, composer study, handicrafts, drill and dance, all met with narration.',
    },
  ],
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

export const give: {
  eyebrow: string;
  heading: string;
  lead: string;
  body: string;
  methods: GivingMethod[];
} = {
  eyebrow: 'Support the school',
  heading: 'Giving keeps the door open.',
  lead: 'Gifts go to books, art supplies, and the room we meet in.',
  body: 'We are a small parent-run co-op, and a gift of any size does real work here — a set of living books for the shared shelf, watercolors and clay for handicrafts, or a family’s tuition quietly covered. Thank you for holding this place up with us.',
  /**
   * Ways to give. Add an entry here and the section renders it; no other file
   * needs to change. Set `available: false` to show a method as coming soon.
   * Card and recurring giving need a server, so they arrive with the move off
   * GitHub Pages — see docs/ROADMAP.md.
   */
  methods: [
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
      href: askUrl('Giving to Abiding Way Cottage School'),
      cta: 'Write to us',
      available: true,
    },
  ],
};

export const contact = {
  eyebrow: 'Contact',
  heading: 'We would love to hear from you.',
  lead: 'Write to us and one of our directors will answer.',
  body: 'Whether you are new to Charlotte Mason or have been at it for years, you are welcome to ask questions before you decide anything. Tell us a little about your family and the ages of your children.',
  emailHref: askUrl('Hello from a prospective family'),
  emailCta: 'Email the directors',
};

export const footer = {
  quote: {
    text: 'Education is an atmosphere, a discipline, a life.',
    cite: 'Charlotte M. Mason',
  },
};
