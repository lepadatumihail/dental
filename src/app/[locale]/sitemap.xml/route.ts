import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getAlternateUrls, getCanonicalUrl } from '@/lib/canonical'
import { DEFAULT_LOCALE, isLocale } from '@/lib/locales'
import { loadArticles } from '@/lib/mdx'

// Define the site routes relative to the locale root. Every `[locale]` page
// must be listed here; blog posts are added from `loadArticles()`.
const ROUTES = [
  '',
  '/about',
  '/contact',
  '/pricing',
  '/services',
  '/services/aesthetics',
  '/services/dental',
  '/services/emergency',
  '/services/general-medicine',
  '/services/massage-therapy',
]

// English-only routes: listed in the `/en` sitemap only, since the other
// locales canonicalise to `/en`.
const ENGLISH_ONLY_ROUTES = ['/blog']

interface SitemapEntry {
  route: string
  lastmod?: string
  englishOnly: boolean
}

function priorityFor(route: string): { priority: number; changefreq: string } {
  if (route === '') return { priority: 1.0, changefreq: 'weekly' }
  if (route === '/contact') return { priority: 0.9, changefreq: 'monthly' }
  if (route === '/about' || route === '/services' || route === '/services/emergency') {
    return { priority: 0.8, changefreq: 'monthly' }
  }
  if (route === '/pricing' || route.startsWith('/services/')) {
    return { priority: 0.7, changefreq: 'monthly' }
  }
  if (route === '/blog') return { priority: 0.6, changefreq: 'weekly' }
  return { priority: 0.5, changefreq: 'monthly' }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { locale: string } },
) {
  const { locale } = params
  if (!isLocale(locale)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const articles = loadArticles()
  const entries: Array<SitemapEntry> = [
    ...ROUTES.map((route) => ({ route, englishOnly: false })),
    ...ENGLISH_ONLY_ROUTES.map((route) => ({
      route,
      lastmod: articles[0]?.date,
      englishOnly: true,
    })),
    ...articles.map((article) => ({
      route: article.href,
      lastmod: article.date,
      englishOnly: true,
    })),
  ].filter((entry) => !entry.englishOnly || locale === DEFAULT_LOCALE)

  const urls = entries
    .map(({ route, lastmod, englishOnly }) => {
      const { priority, changefreq } = priorityFor(route)
      const alternates = Object.entries(
        getAlternateUrls(route, englishOnly ? [DEFAULT_LOCALE] : undefined),
      ).map(
        ([hreflang, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`,
      )

      return [
        '  <url>',
        `    <loc>${getCanonicalUrl(route, locale)}</loc>`,
        ...alternates,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
  ].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
