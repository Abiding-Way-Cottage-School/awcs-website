import Photo from '@/components/Photo';

/** A full-bleed photograph, optionally carrying a quote over a soft olive scrim. */
export default function PhotoBand({
  image,
  quote,
}: {
  image: string;
  quote?: { text: string; cite?: string };
}) {
  return (
    <section className="photo-band">
      <Photo src={image} shape="band" sizes="100vw" />
      {quote ? (
        <div className="photo-band__caption">
          <blockquote>
            {quote.text.split('\n').map((line) => (
              <span key={line} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
            {quote.cite ? <cite>{quote.cite}</cite> : null}
          </blockquote>
        </div>
      ) : null}
    </section>
  );
}
