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
 */
export default function Photo({
  src,
  alt,
  shape = 'landscape',
  priority = false,
  sizes = '(min-width: 60rem) 50vw, 100vw',
  className = '',
}: {
  src: string;
  alt?: string;
  shape?: Shape;
  priority?: boolean;
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
        priority={priority}
      />
    </div>
  );
}
