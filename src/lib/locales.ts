import { routing } from '@/i18n/routing'

export type Locale = (typeof routing.locales)[number]

export const LOCALES = routing.locales
export const DEFAULT_LOCALE: Locale = routing.defaultLocale

// URL segment → BCP 47 language tag. The `/se` URLs are kept for backwards
// compatibility, but the content is Swedish (`sv`); `se` is Northern Sami.
export const LANGUAGE_TAGS: Record<Locale, string> = {
  en: 'en',
  es: 'es',
  se: 'sv',
}

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_GB',
  es: 'es_ES',
  se: 'sv_SE',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as ReadonlyArray<string>).includes(value)
}

export function languageTag(locale: string): string {
  return isLocale(locale) ? LANGUAGE_TAGS[locale] : locale
}
