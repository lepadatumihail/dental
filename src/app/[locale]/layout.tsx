// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { RootLayout } from '@/components/RootLayout'
import { CookieBanner } from '@/components/CookieBanner'
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

  // 3) Render provider with both locale + messages
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RootLayout>
        {children}
        <CookieBanner />
      </RootLayout>
    </NextIntlClientProvider>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
