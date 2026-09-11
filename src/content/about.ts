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
      body: 'How two mothers and a nature group became a cottage school.',
      href: '/about/story/',
      image: photo.candleDried,
    },
    {
      name: 'Our Leadership',
      body: 'The mothers who carry the practical weight of the day.',
      href: '/about/leadership/',
      image: photo.armsLinked,
    },
  ],
};

export const philosophy = {
  eyebrow: 'Our philosophy',
  heading: 'Children are born persons.',
  lead: 'Not vessels to be filled, and not clay to be moulded. Persons, already.',
  image: photo.readingOnBlanket,
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
    image: photo.openPsalms,
  },
};

export const story = {
  eyebrow: 'Our story',
  heading:
    'It began with two mothers, a shared love of home education, and a vision for something beautiful.',
  lead: 'Long before there was Abiding Way, there was friendship.',
  image: photo.dancingCircle,
  opening: [
    'Bethany and I first became friends as teenagers and young adults. Years later, after we had both become mothers, we reconnected and found ourselves walking through many of the same seasons of motherhood and home education together.',
    'We both knew we wanted to homeschool our children. We loved being home with them and having the freedom to shape their education ourselves. Around the same time, we both discovered Charlotte Mason and fell in love with her vision of an education filled with living books, nature, beauty, and rich ideas.',
    'But we also discovered how abundant that vision really was.',
    'There was art, music, poetry, Shakespeare, handicrafts, foreign language, nature study, movement, and so much more. We wanted our children to experience this generous feast, but we began to realize that some things were even more beautiful when shared with others.',
  ],
  sections: [
    {
      heading: 'The Seed',
      body: [
        'So we started with nature.',
        'For three years, Abide Nature Group brought our families together in different places around our community. What began as relaxed nature walks grew into themed lessons, nature journaling, living books, shared meals, and, most importantly, friendship.',
        'The children were growing together.',
        'So were the mothers.',
        'The nature group became the seed of what would eventually become Abiding Way.',
      ],
    },
    {
      heading: 'A Different Kind of School',
      body: [
        'As our children approached their school years, our vision became clearer.',
        'We looked for a community that reflected what we were hoping to build, but we couldn’t quite find it. We didn’t want to recreate traditional school in another setting or take the place of the mother. We wanted something that would complement the home: a beautiful addition to the homeschool week where children could experience goodness, beauty, and truth alongside other families who shared the same vision.',
        'We envisioned short, focused lessons in poetry, Shakespeare, art, music, language, movement, handicrafts, and more, while mothers remained their children’s primary educators.',
        'We also wanted mothers to have a place to grow together through friendship, study, conversation, and encouragement.',
        'Most of all, we wanted Christ to be at the center. Not simply as another part of the day, but as the foundation underneath all that we were doing.',
        'A place where Wednesday could feel like a breath of fresh air in the middle of the school week.',
      ],
    },
    {
      heading: 'Bringing It to Life',
      body: [
        'During our last year of Abide Nature Group, we began building that vision.',
        'There were countless coffee shop conversations, planning sessions, questions, revisions, and prayers as we worked to create something that felt true to what we had envisioned.',
        'We knew what we wanted to protect: slow childhood, beauty, simplicity, close relationships, the mother’s role, and Christ at the center.',
        'And eventually, we decided to go for it.',
        'The name Abiding Way grew from our desire to build a community rooted in Christ, along with the biblical picture of seeking the ancient paths and walking in the good way.',
        'Cottage School reflects what we hoped the community would feel like: intimate, welcoming, small, and more like a little educational home than an institution.',
      ],
    },
    {
      heading: 'Where We Are Now',
      body: [
        'What began as a few mothers walking nature trails together has become a community of families learning, growing, and forming friendships together.',
        'Children are discovering beautiful things side by side. Mothers are encouraging one another in the work of educating their children. Friendships are taking root.',
        'And we are still just beginning.',
        'Our hope is to grow carefully while protecting the things that mattered to us from the very beginning: Christ, beauty, wonder, childhood, motherhood, and community.',
      ],
    },
  ],
  closing: 'This is Abiding Way.',
  gallery: [photo.woolBasket, photo.pressedFlowers, photo.childReading],
};

export const leadership = {
  eyebrow: 'Our leadership',
  heading: 'The mothers who carry the day.',
  lead: 'Abiding Way is led by the parents who teach in it.',
  image: photo.armsLinked,
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
