import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';

import Reveal from '@/components/Reveal';
import { school } from '@/content/site';

import './globals.css';

// The brand faces, self-hosted by next/font at build time and exposed as CSS
// variables that tokens.css folds into --font-display and --font-body. (A plain
// @import of Google Fonts in the stylesheet was silently dropped by the bundler,
// so production rendered in fallback faces until this.)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// The live domain. NEXT_PUBLIC_SITE_URL overrides it so preview deployments
// advertise their own address rather than production's.
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
    <html
      lang="en"
      className={`no-js ${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
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
