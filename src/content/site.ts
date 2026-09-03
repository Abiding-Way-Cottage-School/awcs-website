/**
 * School facts and site navigation.
 *
 * This file holds things that are true about the school and appear in more than
 * one place. Page copy lives beside it in home.ts, about.ts, community.ts,
 * families.ts and join.ts.
 *
 * Facts come from the 2026-2027 Family Handbook. Anything invented is marked
 * DRAFT and listed in docs/CONTENT-TODO.md.
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
    arrival: '9:00 a.m.',
    assembly: '9:30 a.m.',
    dismissal: '1:30 p.m.',
    venue: 'Reach Church',
    street: '4815-200 Executive Park Ct, Ste 200',
    cityStateZip: 'Jacksonville, FL 32216',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=4815-200+Executive+Park+Ct+Ste+200+Jacksonville+FL+32216',
  },
  /** The co-op communicates through the BAND app once a family has joined. */
  communicationApp: 'BAND',
  directors: [
    { name: 'Lily Anderson', role: 'Co-Director' },
    { name: 'Bethany Lynch', role: 'Co-Director' },
  ],
};

export const mailto = (subject: string) =>
  'mailto:' + school.email + '?subject=' + encodeURIComponent(subject);

/** The three words that describe the atmosphere the co-op keeps. */
export const atmosphereWords = ['Truth', 'Beauty', 'Goodness'];

/** The six commitments, quoted from the handbook. */
export const commitments = [
  {
    name: 'Christ at the center',
    body: 'Every subject, every habit, every hour belongs to him. He is not a class we add; he is the ground we stand on.',
  },
  {
    name: 'Living over lifeless',
    body: 'Whole books written by people who loved their subject, in place of textbooks assembled by committee.',
  },
  {
    name: 'Slow & thoughtful',
    body: 'Short lessons, full attention, and time left over. We would rather do less well than more poorly.',
  },
  {
    name: 'Habit as kindness',
    body: 'Good habits are a gift to a child, not a burden laid on them. They make the right thing easy.',
  },
  {
    name: 'Wonder protected',
    body: 'We do not explain away what a child could notice. Awe is the beginning of knowledge, not a reward for it.',
  },
  {
    name: 'Mothers, together',
    body: 'No one carries this alone. We teach beside each other, and we are better for the company.',
  },
];

export const quotes = {
  mason: {
    text: 'Education is an atmosphere, a discipline, a life.',
    cite: 'Charlotte M. Mason',
  },
  john15: {
    text: 'Abide in me, and I in you…',
    cite: 'John 15:4',
  },
  bornPerson: {
    text: 'Children are born persons.',
    cite: 'Charlotte M. Mason',
  },
  feast: {
    text: 'The children have a right to the best we possess.',
    cite: 'Charlotte M. Mason',
  },
};

/**
 * The navigation tree. A section with `children` renders as a dropdown; its own
 * `href` is the landing page for that section.
 *
 * Add a page here and it appears in the header and the footer sitemap.
 */
export type NavLink = { label: string; href: string };
export type NavSection = NavLink & { children?: NavLink[] };

export const nav: NavSection[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Our Philosophy', href: '/about/philosophy/' },
      { label: 'Our Story', href: '/about/story/' },
      { label: 'Our Leadership', href: '/about/leadership/' },
    ],
  },
  {
    label: 'Our Community',
    href: '/community/',
    children: [
      { label: 'The Abiding Way Experience', href: '/community/experience/' },
      { label: 'A Day at Abiding Way', href: '/community/a-day/' },
      { label: 'The Feast', href: '/community/the-feast/' },
      { label: 'For Mothers', href: '/community/for-mothers/' },
    ],
  },
  {
    label: 'Families',
    href: '/families/',
    children: [
      { label: "Who It's For", href: '/families/who-its-for/' },
      { label: 'Tuition & Fees', href: '/families/tuition/' },
      { label: 'FAQ', href: '/families/faq/' },
      { label: 'Calendar', href: '/families/calendar/' },
    ],
  },
  {
    label: 'Join Us',
    href: '/join/',
    children: [
      { label: 'Visit Us', href: '/join/visit/' },
      { label: 'Apply', href: '/join/apply/' },
    ],
  },
  { label: 'Family Portal', href: '/portal/' },
];

/** Photography. See docs/PHOTO-CREDITS.md — all Pexels, free for commercial use. */
export const photo = {
  // Supplied by the school and used in the most prominent slots.
  handInHand: '/photos/hand-in-hand.jpg',
  watercolorSet: '/photos/watercolor-set.jpg',
  dancingCircle: '/photos/dancing-circle.jpg',
  armsLinked: '/photos/arms-linked.jpg',
  childStudying: '/photos/child-studying.jpg',
  silhouetteSunset: '/photos/silhouette-sunset.jpg',

  heroPath: '/photos/hero-path.jpg',
  fieldGolden: '/photos/field-golden.jpg',
  mistyField: '/photos/misty-field.jpg',
  childrenWalking: '/photos/children-walking.jpg',
  childrenTogether: '/photos/children-together.jpg',
  booksHeld: '/photos/books-held.jpg',
  bookPages: '/photos/book-pages.jpg',
  bookOldHands: '/photos/book-old-hands.jpg',
  childReading: '/photos/child-reading.jpg',
  woolBasket: '/photos/wool-basket.jpg',
  knittingHands: '/photos/knitting-hands.jpg',
  pressedFlowers: '/photos/pressed-flowers.jpg',
  woodworkHands: '/photos/woodwork-hands.jpg',
  driedGrass: '/photos/dried-grass.jpg',
  bowlLinen: '/photos/bowl-linen.jpg',
  lightWall: '/photos/light-wall.jpg',
  candleDried: '/photos/candle-dried.jpg',
};

/** Alt text, kept beside the paths so no image ships without a description. */
export const photoAlt: Record<string, string> = {
  [photo.handInHand]: 'An adult hand holding a small child’s hand as they walk beside the water.',
  [photo.watercolorSet]: 'An open box of watercolors, brushes and a sheet of paper laid out on cloth.',
  [photo.dancingCircle]: 'Women dancing in a ring on the grass in a summer garden.',
  [photo.armsLinked]: 'Two people standing arm in arm, hands clasped.',
  [photo.childStudying]: 'A child at a desk working over an open illustrated book.',
  [photo.silhouetteSunset]: 'An adult and a child silhouetted against the water at sunset, arms outstretched.',
  [photo.heroPath]: 'A figure walking a narrow path through a misty field at dawn.',
  [photo.fieldGolden]: 'Low golden light across an open meadow.',
  [photo.mistyField]: 'A single tree in a quiet field under morning mist.',
  [photo.childrenWalking]: 'Two children walking together through tall grass, seen from behind.',
  [photo.childrenTogether]:
    'The children of the co-op standing in a line with their arms around one another, seen from behind, under live oaks hung with Spanish moss.',
  [photo.booksHeld]: 'A hand holding up a small stack of hardback books.',
  [photo.bookPages]: 'The open pages of a well-used book in warm light.',
  [photo.bookOldHands]: 'Hands holding an old book open.',
  [photo.childReading]: 'A child reading at a desk beside a bookshelf, seen from behind.',
  [photo.woolBasket]: 'A basket of undyed wool and knitted work.',
  [photo.knittingHands]: 'Hands working a pair of knitting needles.',
  [photo.pressedFlowers]: 'Pressed flowers and ferns arranged on paper.',
  [photo.woodworkHands]: 'Hands planing a length of timber at a workbench.',
  [photo.driedGrass]: 'Dried grasses and a pressed leaf against a pale wall.',
  [photo.bowlLinen]: 'A small wooden bowl resting on folded linen.',
  [photo.lightWall]: 'Morning light falling across a plain interior wall.',
  [photo.candleDried]: 'A candle and a vase of dried flowers on a table.',
};
