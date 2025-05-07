import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.prismaclinicmarbella.es'),
  title: {
    template: '%s - Prisma Clinic Marbella',
    default:
      'Prisma Clinic Marbella - Award winning dental clinic based in Marbella',
  },
  description:
    'Award-winning dental clinic in Marbella offering comprehensive dental care, aesthetic treatments, emergency dental services available 24/7, and top-quality patient experience.',
  keywords: [
    'dental clinic',
    'Marbella',
    'cosmetic dentistry',
    'aesthetic treatments',
    'dental care',
    'Prisma Clinic',
    'emergency dentist',
    '24/7 dental care',
    'emergency dental care',
    'dentist open 24/7',
    'urgent dental care',
  ],
  authors: [{ name: 'Prisma Clinic Marbella' }],
  creator: 'Prisma Clinic Marbella',
  publisher: 'Prisma Clinic Marbella',
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Prisma Clinic Marbella',
      },
    ],
    title:
      'Prisma Clinic Marbella - Award winning dental clinic based in Marbella',
    description:
      'Award-winning dental clinic in Marbella offering comprehensive dental care, aesthetic treatments, emergency dental services available 24/7, and top-quality patient experience.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Prisma Clinic Marbella',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Prisma Clinic Marbella - Award winning dental clinic with 24/7 emergency care',
    description:
      'Award-winning dental clinic in Marbella offering comprehensive dental care, aesthetic treatments, and emergency dental services available 24/7',
    images: ['/og-image.jpg'],
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

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
