import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

import { RootLayout } from '@/components/RootLayout'
import { BASE_URL } from '@/lib/canonical'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  verification: {
    google: 'chl-GKbeOp0emOcri6NNeNHbv7xcnBzi618ga8beWEI',
  },
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
    <html className="h-full bg-neutral-950 text-base antialiased">
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Ahrefs Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="50Zg5u7x92m3eDyxjhSJww"
          strategy="lazyOnload"
        />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NH6BS3G8');
          `}
        </Script>

        {/* Google Tag Manager with Consent Mode */}
        <Script id="google-consent">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Default consent state for EU users
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500,
            });
            
            gtag('js', new Date());
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JHK75NLNSK"
          strategy="lazyOnload"
        />
        <Script id="google-analytics">
          {`
            gtag('config', 'G-JHK75NLNSK', {
              anonymize_ip: true,
              cookie_flags: 'samesite=strict;secure'
            });
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NH6BS3G8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}
        <Analytics />
      </body>
    </html>
  )
}
