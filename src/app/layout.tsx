import type { Metadata, Viewport } from 'next';

import Reveal from '@/components/Reveal';
import { school } from '@/content/site';

import './globals.css';

// The live domain. NEXT_PUBLIC_SITE_URL overrides it so preview deployments and
// the GitHub Pages mirror advertise their own address rather than production's.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://abidingwaycottageschool.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${school.name} · ${school.tagline}`,
    template: `%s · ${school.name}`,
  },
  description: school.description,
  applicationName: school.name,
  alternates: { canonical: '/' },
  keywords: [
    'Charlotte Mason',
    'homeschool co-op',
    'Jacksonville',
    'Florida',
    'Christian homeschool',
    'enrichment co-op',
  ],
  openGraph: {
    type: 'website',
    siteName: school.name,
    title: `${school.name} · ${school.tagline}`,
    description: school.description,
    locale: 'en_US',
    images: [
      {
        // Resolved against metadataBase, which already carries the basePath.
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${school.name} — ${school.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${school.name} · ${school.tagline}`,
    description: school.description,
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#31331F',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `no-js` is stripped by Reveal on mount. Until then it keeps every
    // `.reveal` block visible, so the page reads fine without JavaScript.
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        {/* tokens.css pulls Cormorant Garamond and Inter from Google Fonts. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
