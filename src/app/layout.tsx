import type { Metadata } from 'next'

import {
  BASE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
} from '@/lib/canonical'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  verification: {
    google: 'chl-GKbeOp0emOcri6NNeNHbv7xcnBzi618ga8beWEI',
  },
  openGraph: {
    images: [DEFAULT_OG_IMAGE],
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: 'website',
    locale: 'en_GB',
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo-small.png',
    apple: '/logo-small.png',
  },
}

// `<html>` and `<body>` live in `[locale]/layout.tsx` so `lang` can follow the
// locale. This layout only exists because `not-found.tsx` sits at the root.
export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
