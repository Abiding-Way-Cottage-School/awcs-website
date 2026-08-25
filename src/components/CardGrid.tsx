import Link from 'next/link';

import Photo from '@/components/Photo';

export type Card = {
  name: string;
  body: string;
  href: string;
  image: string;
};

/** The section-index grid: a photo, a title, a line, and a quiet "more" link. */
export default function CardGrid({
  cards,
  columns = 3,
}: {
  cards: readonly Card[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <div className={`cards cards--${columns}`}>
      {cards.map((card) => (
        <Link key={card.href} href={card.href} className="card-link">
          <Photo
            src={card.image}
            shape="landscape"
            sizes="(min-width: 60rem) 30vw, 100vw"
          />
          <h3>{card.name}</h3>
          <p>{card.body}</p>
          <span className="card-link__more">Read more</span>
        </Link>
      ))}
    </div>
  );
}
