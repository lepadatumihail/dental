// src/app/[locale]/layout.tsx
import { ConsentedAnalytics } from '@/components/ConsentedAnalytics'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { RootLayout } from '@/components/RootLayout'
import { CookieBanner } from '@/components/CookieBanner'
import { JsonLd } from '@/components/JsonLd'
import { playfair, raleway } from '@/lib/fonts'
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
      className={`${raleway.variable} ${playfair.variable} h-full bg-white text-base text-ink antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden font-light">
        <JsonLd data={siteGraph(locale, tMeta('description'))} />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <RootLayout>
            {children}
            <CookieBanner />
          </RootLayout>
        </NextIntlClientProvider>
        <ConsentedAnalytics />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
