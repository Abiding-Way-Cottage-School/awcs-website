import Photo from '@/components/Photo';

/** A full-bleed photograph, optionally carrying a quote over a soft olive scrim. */
export default function PhotoBand({
  image,
  quote,
}: {
  image: string;
  quote?: { text: string; cite: string };
}) {
  return (
    <section className="photo-band">
      <Photo src={image} shape="band" sizes="100vw" />
      {quote ? (
        <div className="photo-band__caption">
          <blockquote>
            {quote.text}
            <cite>{quote.cite}</cite>
          </blockquote>
        </div>
      ) : null}
    </section>
  );
}
