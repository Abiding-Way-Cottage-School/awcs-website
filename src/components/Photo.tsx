import Image from 'next/image';

import { photoAlt } from '@/content/site';
import { asset } from '@/lib/asset';

type Shape = 'tall' | 'portrait' | 'square' | 'landscape' | 'wide' | 'band' | 'fill';

/**
 * A brand-treated photograph.
 *
 * Alt text is looked up from content/site.ts so an image cannot ship without a
 * description; pass `alt` to override, or alt="" for a purely decorative one.
 * The desaturate-and-warm treatment the brand kit asks for lives in site.css.
 *
 * `preload` is next/image's own prop, replacing the `priority` it deprecated in
 * Next 16. Set it on the one photograph that opens a page and nowhere else — a
 * preload link for an image further down the page competes with the one above it.
 */
export default function Photo({
  src,
  alt,
  shape = 'landscape',
  preload = false,
  sizes = '(min-width: 60rem) 50vw, 100vw',
  className = '',
}: {
  src: string;
  alt?: string;
  shape?: Shape;
  preload?: boolean;
  sizes?: string;
  className?: string;
}) {
  const shapeClass = shape === 'fill' ? '' : ` photo--${shape}`;
  return (
    <div className={`photo${shapeClass}${className ? ` ${className}` : ''}`}>
      <Image
        src={asset(src)}
        alt={alt ?? photoAlt[src] ?? ''}
        width={1800}
        height={1200}
        sizes={sizes}
        preload={preload}
      />
    </div>
  );
}
