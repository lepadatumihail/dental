// src/app/[locale]/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { RootLayout } from '@/components/RootLayout'
import { CookieBanner } from '@/components/CookieBanner'
import { BookingModalProvider } from '@/components/booking/BookingProvider'
import { JsonLd } from '@/components/JsonLd'
import { raleway } from '@/lib/fonts'
import { languageTag } from '@/lib/locales'
import { siteGraph } from '@/lib/structured-data'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // 1) Validate the locale
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // 2) Fetch the messages JSON for this locale
  let messages: Record<string, string>
  try {
    messages = await getMessages({ locale })
  } catch {
    // if your file isn’t there, 404
    notFound()
  }

  const tMeta = await getTranslations({ locale, namespace: 'meta.home' })

  // 3) Render provider with both locale + messages
  return (
    <html
      lang={languageTag(locale)}
      className={`${raleway.variable} h-full bg-surface-200 text-base antialiased`}
    >
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

        <JsonLd data={siteGraph(locale, tMeta('description'))} />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <BookingModalProvider>
            <RootLayout>
              {children}
              <CookieBanner />
            </RootLayout>
          </BookingModalProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
