import type { Metadata } from 'next'

import {
  DEFAULT_LOCALE,
  LANGUAGE_TAGS,
  LOCALES,
  OG_LOCALES,
  isLocale,
  type Locale,
} from '@/lib/locales'

export const BASE_URL = 'https://www.prismaclinicmarbella.es'

export const SITE_NAME = 'Prisma Clinic Marbella'

export const DEFAULT_TITLE =
  'Prisma Clinic Marbella | Dental, Aesthetic & Medical Clinic'

export const DEFAULT_DESCRIPTION =
  'Private dental, aesthetic and general medicine clinic with two locations in Marbella and Puerto Banús. English-speaking doctors and 24/7 emergency care.'

export const DEFAULT_OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: SITE_NAME,
}

/**
 * Generates the canonical URL for a given path and locale
 * @param path - The path without locale (e.g., '/about', '/services/dental')
 * @param locale - The locale (e.g., 'en', 'es', 'se')
 * @returns The complete canonical URL
 */
export function getCanonicalUrl(path: string = '', locale: string = 'en'): string {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // Construct the canonical URL
  const canonicalUrl = cleanPath
    ? `${BASE_URL}/${locale}/${cleanPath}`
    : `${BASE_URL}/${locale}`

  return canonicalUrl
}

/**
 * Generates hreflang alternates keyed by language tag (`se` → `sv`), plus an
 * `x-default` pointing at the default locale.
 * @param path - The path without locale
 * @param locales - Locales the page is available in
 */
export function getAlternateUrls(
  path: string = '',
  locales: ReadonlyArray<Locale> = LOCALES,
): Record<string, string> {
  const alternates: Record<string, string> = {}

  locales.forEach((locale) => {
    alternates[LANGUAGE_TAGS[locale]] = getCanonicalUrl(path, locale)
  })
  alternates['x-default'] = getCanonicalUrl(
    path,
    locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0],
  )

  return alternates
}

/**
 * Creates metadata object with canonical and alternate URLs
 * @param path - The path without locale
 * @param locale - Current locale
 * @param locales - Locales the page is available in
 */
export function createCanonicalMetadata(
  path: string = '',
  locale: string = 'en',
  locales: ReadonlyArray<Locale> = LOCALES,
) {
  return {
    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: getAlternateUrls(path, locales),
    },
  }
}

interface PageMetadataOptions {
  /** Path without locale, e.g. 'services/dental'. */
  path?: string
  locale: string
  /**
   * Short title, completed by the root template (`%s | Prisma Clinic
   * Marbella`), or `{ absolute }` for a title that already names the clinic.
   * Omit to use the site default.
   */
  title?: string | { absolute: string }
  description: string
  /** Content exists in English only, so every locale canonicalises to `/en`. */
  englishOnly?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  authors?: Array<string>
}

/**
 * Full per-page metadata: title, description, canonical, hreflang, Open Graph
 * and Twitter. Open Graph and Twitter are set per page because Next.js
 * replaces (rather than merges) those objects between segments.
 */
export function createPageMetadata({
  path = '',
  locale,
  title,
  description,
  englishOnly = false,
  type = 'website',
  publishedTime,
  authors,
}: PageMetadataOptions): Metadata {
  const canonicalLocale: Locale = englishOnly
    ? DEFAULT_LOCALE
    : isLocale(locale)
      ? locale
      : DEFAULT_LOCALE
  const url = getCanonicalUrl(path, canonicalLocale)
  const fullTitle =
    title === undefined
      ? DEFAULT_TITLE
      : typeof title === 'string'
        ? `${title} | ${SITE_NAME}`
        : title.absolute
  const locales = englishOnly ? [DEFAULT_LOCALE] : LOCALES

  return {
    ...(title !== undefined && { title }),
    description,
    alternates: {
      canonical: url,
      languages: getAlternateUrls(path, locales),
    },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: OG_LOCALES[canonicalLocale],
      alternateLocale: locales
        .filter((l) => l !== canonicalLocale)
        .map((l) => OG_LOCALES[l]),
      images: [DEFAULT_OG_IMAGE],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  }
}
