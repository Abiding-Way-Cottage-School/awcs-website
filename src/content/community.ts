import { photo, school } from './site';

export const communityIndex = {
  eyebrow: 'Our community',
  heading: 'What a Wednesday is really like.',
  lead: 'The shape of the day, the subjects we spread, and the women who hold it together.',
  image: photo.childrenWalking,
  cards: [
    {
      name: 'The Abiding Way Experience',
      body: 'What sets a Wednesday here apart from a co-op with a curriculum and a schedule.',
      href: '/community/experience/',
      image: photo.lightWall,
    },
    {
      name: 'A Day at Abiding Way',
      body: 'Hour by hour, from arrival at nine to dismissal at half past one.',
      href: '/community/a-day/',
      image: photo.mistyField,
    },
    {
      name: 'The Feast',
      body: 'Everything we spread on the table: Shakespeare to Swedish Drill.',
      href: '/community/the-feast/',
      image: photo.watercolorSet,
    },
    {
      name: 'For Mothers',
      body: 'What the co-op asks of you, and what it gives back.',
      href: '/community/for-mothers/',
      image: photo.dancingCircle,
    },
  ],
};

export const experience = {
  eyebrow: 'The Abiding Way experience',
  heading: 'Quiet, ordered, and full of life.',
  lead: 'You can tell a great deal about a school from how it sounds at ten in the morning.',
  image: photo.lightWall,
  intro: [
    'Walk in on a Wednesday and the first thing you will notice is that it is not loud. Not silent — there are children here, and folk dance is coming — but unhurried. Nobody is being rushed from one thing to the next, and nobody is being entertained.',
    'The second thing you will notice is that the children are doing the work. They are the ones telling the story back. They are the ones looking at the painting and describing it from memory. The adults in the room are largely quiet, which takes more discipline than talking.',
  ],
  marks: {
    eyebrow: 'What sets it apart',
    heading: 'Six things a visitor notices.',
    items: [
      {
        name: 'Mixed ages, on purpose',
        body: 'A six-year-old and an eleven-year-old hear the same Shakespeare. They take different things from it, and both take something real.',
      },
      {
        name: 'One reading, then narration',
        body: 'We do not re-read, and we do not quiz. The child attends the first time because they know they will be asked to tell it.',
      },
      {
        name: 'Short lessons, hard stops',
        body: 'Twenty minutes of full attention, then we move. Lessons end while interest is still high, which is why it survives to next week.',
      },
      {
        name: 'Beautiful things, unexplained',
        body: 'A real painting, a real symphony, a real poem, without a worksheet attached. We let them do their own work on a child.',
      },
      {
        name: 'Outdoors whenever possible',
        body: 'Lunch outside, nature study outside, and the plain assumption that weather is not an obstacle.',
      },
      {
        name: 'Parents in the room',
        body: 'Not observers. Teaching, assisting, holding babies, setting out lunch. The children see their mothers work.',
      },
    ],
  },
  quote: {
    text: 'Education is an atmosphere, a discipline, a life.',
    cite: 'Charlotte M. Mason',
  },
  gallery: [photo.booksHeld, photo.knittingHands, photo.candleDried],
};

export const aDay = {
  eyebrow: 'A day at Abiding Way',
  heading: 'One day a week, unhurried.',
  lead: `${school.meeting.day}, ${school.meeting.season}.`,
  image: photo.mistyField,
  intro:
    'We meet once a week and we make it count. The shape below is the ordinary rhythm of a Wednesday; the particular subjects rotate through the term.',
  /* DRAFT — arrival, assembly and dismissal times are from the handbook and are
     correct. The middle of the day (the 10:00, 12:00 and 12:30 blocks) is a
     reasonable reconstruction and should be checked against the real schedule. */
  schedule: [
    {
      time: '9:00',
      label: 'Arrival',
      note: 'Families gather, coats and baskets down, a little time to greet one another before we begin.',
    },
    {
      time: '9:30',
      label: 'Assembly',
      note: 'The whole school together: a hymn, Scripture, recitation, and the day set before us.',
    },
    {
      time: '10:00',
      label: 'Morning lessons',
      note: 'Main subjects in small mixed-age groups — Shakespeare, poetry, picture study, composer study — each short, each ending with narration.',
    },
    {
      time: '12:00',
      label: 'Lunch together',
      note: 'Outdoors whenever the weather allows. The mothers eat together too, which matters more than it sounds.',
    },
    {
      time: '12:30',
      label: 'Afternoon studies',
      note: 'Handicrafts, folk dance, Swedish drill, balance and coordination — the parts of the feast that need a room full of people.',
    },
    {
      time: '1:30',
      label: 'Dismissal',
      note: 'Home again, with something to tell.',
    },
  ],
  rooms: {
    eyebrow: 'Three rooms at once',
    heading: 'Everyone has somewhere to be.',
    body: 'While the main subjects are running, the youngest children are cared for in the nursery and the three-to-fives have their own gentle morning. No mother has to choose between teaching and her toddler.',
  },
  bring: {
    eyebrow: 'What to bring',
    heading: 'Not much.',
    /* DRAFT — a sensible list, not taken from the handbook. Confirm with leadership. */
    items: [
      'A packed lunch and a water bottle',
      'A nature notebook and a pencil',
      'Shoes that can be danced and drilled in',
      'A sweater — the room runs cool',
    ],
  },
};

export const theFeast = {
  eyebrow: 'The feast',
  heading: 'A wide table, generously set.',
  lead: 'We do not decide in advance what a child will love.',
  image: photo.watercolorSet,
  intro: [
    'Mason used the word feast deliberately. A feast is not a diet plan; nobody weighs what is taken. It is spread out, and it is offered, and the guest eats what nourishes them.',
    'So we lay out far more than any one child will make their life’s work, and we do not apologise for the breadth. A child who never becomes a musician has still spent a year listening to Bach, and is not the same for it.',
  ],
  /* Subjects are from the handbook and are correct. The descriptions are ours. */
  groups: [
    {
      name: 'Language & literature',
      image: photo.bookPages,
      subjects: [
        { name: 'Shakespeare', body: 'Read aloud in parts, unabridged, from the beginning. Children meet the real language and rise to it.' },
        { name: 'Poetry', body: 'One poet at a time, read slowly and often, until the lines belong to the child.' },
        { name: 'Narration', body: 'Not a subject so much as the method underneath all of them: tell it back, in your own words.' },
        { name: 'Spanish', body: 'A living language learned by ear and by use, in songs, phrases and ordinary conversation.' },
      ],
    },
    {
      name: 'Beauty & making',
      image: photo.woolBasket,
      subjects: [
        { name: 'Picture Study', body: 'One artist a term. Look in silence, turn the picture over, and describe it from memory.' },
        { name: 'Music & Composer Study', body: 'One composer a term, heard often enough to be recognised like a friend’s voice.' },
        { name: 'Handicrafts', body: 'Real skills making real things — knitting, sewing, clay, woodwork — finished properly and used.' },
      ],
    },
    {
      name: 'Body & motion',
      image: photo.childrenWalking,
      subjects: [
        { name: 'Folk Dance', body: 'Traditional dances learned together. Joyful, a little chaotic, and impossible alone.' },
        { name: 'Swedish Drill', body: 'Short, precise, whole-body exercises. Mason prized them for attention as much as for fitness.' },
        { name: 'Balance & Coordination', body: 'Deliberate practice at the physical skills that make a child at home in their own body.' },
      ],
    },
  ],
  quote: {
    text: 'The children have a right to the best we possess.',
    cite: 'Charlotte M. Mason',
  },
};

export const forMothers = {
  eyebrow: 'For mothers',
  heading: 'You are not dropping them off.',
  lead: 'This is a co-op. It asks something of you, and it gives more back.',
  image: photo.dancingCircle,
  intro: [
    'Abiding Way is a parent-participation co-op, which means there is no staff to hand your children to. Every mother takes a part: teaching a subject, assisting in a room, holding babies in the nursery, setting out lunch, running the music for assembly.',
    'It is real work. It is also the reason the co-op costs what it costs, and the reason it feels like ours rather than a service we bought.',
  ],
  asks: {
    eyebrow: 'What is asked',
    heading: 'The commitment, plainly.',
    /* DRAFT — a fair description of a participation co-op, but confirm the specifics
       (how many roles, whether preparation is weekly, the background-check policy)
       against the handbook before publishing. */
    items: [
      { name: 'Be there', body: 'Wednesdays, September through May. Consistency is most of what makes a co-op work.' },
      { name: 'Take a role', body: 'One teaching or supporting role each term, matched to what you can genuinely carry this year.' },
      { name: 'Prepare', body: 'Read ahead, gather what your lesson needs, and come ready. Short lessons only work when they are prepared.' },
      { name: 'Clear a background check', body: 'Every adult who serves is checked. It is a small cost and a plain kindness to every family here.' },
    ],
  },
  gives: {
    eyebrow: 'What it gives',
    heading: 'Mother culture.',
    body: [
      'Mason wrote about mother culture — the idea that a mother must keep her own mind fed if she is to feed anyone else’s. It is easy to say and hard to do in a season of small children.',
      'A co-op helps almost by accident. You will read Shakespeare because you are teaching it. You will learn a composer because you are introducing him. You will spend a Wednesday among women who understand why a morning can be ruined by a bad reading and saved by a good one.',
      'Most mothers tell us this is the part they did not expect.',
    ],
    image: photo.armsLinked,
  },
  quote: {
    text: 'Mothers, together.',
    cite: 'The sixth commitment',
  },
};
