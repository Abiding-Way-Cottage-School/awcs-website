import { photo, school } from './site';

export const aboutIndex = {
  eyebrow: 'About',
  heading: 'Who we are.',
  lead: 'A Christ-centered co-op, rooted in Charlotte Mason, run by the mothers who teach in it.',
  image: photo.driedGrass,
  cards: [
    {
      name: 'Our Philosophy',
      body: 'What Charlotte Mason believed about children, and what that looks like on a Wednesday morning.',
      href: '/about/philosophy/',
      image: photo.bookPages,
    },
    {
      name: 'Our Story',
      body: 'How a few families around a kitchen table became a co-op.',
      href: '/about/story/',
      image: photo.candleDried,
    },
    {
      name: 'Our Leadership',
      body: 'The mothers who carry the practical weight of the day.',
      href: '/about/leadership/',
      image: photo.handsHeld,
    },
  ],
};

export const philosophy = {
  eyebrow: 'Our philosophy',
  heading: 'Children are born persons.',
  lead: 'Not vessels to be filled, and not clay to be moulded. Persons, already.',
  image: photo.bookOldHands,
  intro: [
    'Charlotte Mason was a British educator who spent her life arguing something that still unsettles people: that a child is a whole person from the beginning, with a mind that wants real food. Not a smaller, emptier version of an adult. A person.',
    'Everything else follows from that. If a child is a person, you do not hand them a diluted summary of a subject — you hand them the thing itself, written by someone who loved it. If a child is a person, you do not test whether the information stuck; you ask them to tell you what they know, and you listen.',
  ],
  principles: [
    {
      name: 'Education is an atmosphere',
      body: 'A child learns from the whole environment around them — the tone of the room, the way adults speak to one another, what is on the walls and what is left unsaid. We cannot teach one thing and be another.',
    },
    {
      name: 'Education is a discipline',
      body: 'The forming of good habits: attention, truthfulness, kindness, finishing what you begin. A habit well laid is a gift, because it makes the right thing easy for the rest of a life.',
    },
    {
      name: 'Education is a life',
      body: 'The mind feeds on ideas, not on facts alone. So we set a feast of living ideas — in books, in music, in paintings, in the natural world — and trust the child to take what nourishes.',
    },
  ],
  practices: {
    eyebrow: 'What that looks like here',
    heading: 'The practices we keep.',
    items: [
      {
        name: 'Living books',
        body: 'Whole books by a single author with a real love of the subject, rather than textbooks assembled by committee. A living book has a voice.',
      },
      {
        name: 'Narration',
        body: 'After a single reading, the child tells it back — in their own words, without prompting. It is harder than a quiz and worth incomparably more.',
      },
      {
        name: 'Short lessons',
        body: 'Full attention for a short time beats half attention for a long one. Lessons end while the child is still interested.',
      },
      {
        name: 'Nature study',
        body: 'Time outdoors, looking closely at real things, and drawing what is actually there rather than what we assume.',
      },
      {
        name: 'Masterly inactivity',
        body: 'The wise, watchful restraint of an adult who does not interrupt. Children need unhurried room in which to become themselves.',
      },
      {
        name: 'The feast',
        body: 'A wide and generous spread of subjects, offered to every child, without deciding in advance what any one of them will love.',
      },
    ],
  },
  faith: {
    eyebrow: 'Christ at the center',
    heading: 'Not a subject we add.',
    body: [
      'Mason took for granted that the Holy Spirit is the supreme educator, and that every subject a child studies belongs to God already. We hold the same. Scripture is read for its own sake, not mined for lessons. Hymns are sung because they are true and beautiful.',
      'Families come to us from many churches. What we hold in common, and what we ask families to be glad about, is that Christ is at the center of the day rather than off to one side of it.',
    ],
    image: photo.candleDried,
  },
};

export const story = {
  eyebrow: 'Our story',
  heading: 'It began with a few mothers and a long table.',
  lead: 'A co-op is what happens when several families decide not to do this alone.',
  image: photo.walkingTogether,
  /* DRAFT — the narrative below is written to the right tone but the specifics are
     invented. Replace with the real account: who started it, in what year, what
     prompted it, and how many families there were at the beginning.
     See docs/CONTENT-TODO.md. */
  body: [
    'Like most good things, Abiding Way began as a conversation that would not go away. A handful of mothers, each teaching at home, each doing well enough alone, kept circling the same thought: some parts of this education are meant to be shared. Shakespeare wants a room full of voices. Folk dance needs more than one pair of feet. A picture is easier to look at slowly when someone else is looking too.',
    'So we set a day aside. We found a room. We divided the subjects between us according to what each of us could carry, and we began — imperfectly, and gladly.',
    'What we did not expect was how much the mothers would need it. The children came for Shakespeare and handicrafts. The mothers came for those too, and stayed for the company of women who understood why a morning could be ruined by a bad reading and saved by a good one.',
    'We remain small on purpose. A cottage school is not an institution; it is a household that meets on Wednesdays.',
  ],
  pullQuote: {
    text: 'A cottage school is not an institution; it is a household that meets on Wednesdays.',
    cite: 'Abiding Way Cottage School',
  },
  gallery: [photo.woolBasket, photo.pressedFlowers, photo.childReading],
};

export const leadership = {
  eyebrow: 'Our leadership',
  heading: 'The mothers who carry the day.',
  lead: 'Abiding Way is led by the parents who teach in it.',
  image: photo.bowlLinen,
  intro:
    'Our co-directors handle the practical weight of the co-op — the calendar, the room, the enrollment, the hundred small decisions that let a Wednesday run well — alongside teaching their own children like everyone else.',
  /* DRAFT — names and roles are from the handbook and are correct. The `bio`
     field is intentionally left empty rather than invented: these are real
     people and we will not publish claims about them they have not written.
     Ask Lily and Bethany for two or three sentences each. */
  people: school.directors.map((d) => ({ ...d, bio: '' })),
  join: {
    eyebrow: 'Everyone serves',
    heading: 'There is no audience here.',
    body: 'Every family takes a part — teaching a subject, assisting in a room, holding babies in the nursery, setting out lunch, or running the music for assembly. The load is real, and it is shared, and it is what keeps the co-op affordable and unmistakably ours.',
    image: photo.woodworkHands,
  },
};
