import { mailto, photo, school } from './site';

export const joinIndex = {
  eyebrow: 'Join us',
  heading: 'Come and see.',
  lead: 'Almost every family decides after a Wednesday morning rather than from a website.',
  image: photo.fieldGolden,
  cards: [
    {
      name: 'Visit Us',
      body: 'Spend a Wednesday with us before you decide anything.',
      href: '/join/visit/',
      image: photo.handInHand,
    },
    {
      name: 'Apply',
      body: 'How enrollment works, and what happens after you write.',
      href: '/join/apply/',
      image: photo.booksHeld,
    },
  ],
};

export const visit = {
  eyebrow: 'Visit us',
  heading: 'Spend a Wednesday with us.',
  lead: 'Bring your children. Stay for the morning. Ask anything.',
  image: photo.handInHand,
  intro: [
    'The best way to understand a co-op is to stand in the middle of one. Reading about narration is not the same as watching a nine-year-old tell back a scene from Shakespeare without a note in front of her.',
    'So we would rather you came and saw. Write to us with your family’s names and the ages of your children, and we will find a Wednesday that works.',
  ],
  /* DRAFT — a sensible visit process, not taken from the handbook. Confirm the
     steps, and whether visits are limited to particular weeks in the term. */
  steps: [
    { name: 'Write to us', body: 'Tell us a little about your family and the ages of your children. A sentence or two is plenty.' },
    { name: 'We find a date', body: 'One of the directors will reply with a Wednesday that suits, and what to expect when you arrive.' },
    { name: 'Come for the morning', body: 'Arrive at half past nine with the rest of us. Sit in on assembly and lessons. Eat lunch with the mothers.' },
    { name: 'Take your time', body: 'There is no pressure to decide on the day. Go home, talk it over, and write again when you are ready.' },
  ],
  practical: {
    eyebrow: 'On the day',
    heading: 'What to expect.',
    items: [
      { name: 'Where', body: `${school.meeting.venue}, ${school.meeting.street}, ${school.meeting.cityStateZip}.`, href: school.meeting.mapUrl },
      { name: 'When', body: `Arrive at ${school.meeting.start}; we begin with assembly and finish at ${school.meeting.end}` },
      { name: 'Bring', body: 'A packed lunch for your family and a water bottle each. Nothing else is needed.' },
      { name: 'Wear', body: 'Whatever is comfortable and can be danced in. We go outside at lunch in most weather.' },
    ],
  },
  cta: {
    heading: 'Ask for a Wednesday.',
    body: 'Tell us the ages of your children and roughly when you would like to come.',
    primary: { label: 'Email the directors', href: mailto('We would like to visit') },
  },
};

export const apply = {
  eyebrow: 'Apply',
  heading: 'How a family joins.',
  lead: 'Small enough that a conversation still does most of the work.',
  image: photo.booksHeld,
  intro: [
    'We keep the co-op small on purpose, so enrollment is a conversation rather than a form submitted into a void. Most families visit first, and we would encourage you to.',
  ],
  /* DRAFT — a plausible enrollment process. Confirm the real steps, the timing of
     the enrollment window, and whether there is a waiting list. */
  steps: [
    { name: 'Visit', body: 'Come for a Wednesday morning. Almost everyone does this first, and it answers more than any page can.' },
    { name: 'Write to enroll', body: 'Tell the directors you would like a place, with your children’s names and ages.' },
    { name: 'Paperwork & background check', body: 'A short enrollment form for the family, and a background check for every adult who will serve.' },
    { name: 'Fees & roles', body: 'Enrollment is settled, and you choose the role you will carry for the year alongside the other mothers.' },
    { name: 'Join the BAND', body: `You are added to the ${school.communicationApp} app, where the calendar, notices and the term's plans live.` },
  ],
  portalNote: {
    eyebrow: 'Family portal',
    heading: 'Once you are enrolled.',
    body: 'Enrolled families use the Family Portal to sign the co-op’s forms, find the documents they need and keep track of fees. A director adds your email address once your place is confirmed; until then, everything happens by email, which works perfectly well.',
  },
  cta: {
    heading: 'Ready to begin?',
    body: 'Write to the directors and tell us about your family.',
    primary: { label: 'Email the directors', href: mailto('We would like to enroll') },
    secondary: { label: 'Visit first', href: '/join/visit/' },
  },
};
