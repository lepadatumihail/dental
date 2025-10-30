import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BASE_URL = 'https://www.prismaclinicmarbella.es'
const VALID_LOCALES = new Set(['en', 'es', 'se'])

// Define the site routes relative to the locale root
const ROUTES = [
  '',
  '/about',
  '/contact',
  '/process',
  '/services',
  '/services/aesthetics',
  '/services/dental',
  '/services/emergency',
  '/services/general-medicine',
  '/blog',
  '/blog/top-3-innovations-transforming-dental-patient-care',
  '/blog/a-short-guide-to-component-naming',
  '/blog/botox-myths',
]

export async function GET(
  _req: NextRequest,
  { params }: { params: { locale: string } },
) {
  const { locale } = params
  if (!VALID_LOCALES.has(locale)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const now = new Date().toISOString()

  const urls = ROUTES.map((route) => {
    const loc =
      route === '' ? `${BASE_URL}/${locale}` : `${BASE_URL}/${locale}${route}`

    let priority = 0.5
    let changefreq = 'monthly'

    if (route === '') {
      priority = 1.0
      changefreq = 'weekly'
    } else if (route === '/contact') {
      priority = 0.9
      changefreq = 'monthly'
    } else if (route === '/about' || route === '/services') {
      priority = 0.8
      changefreq = 'monthly'
    } else if (route === '/services/emergency') {
      priority = 0.8
      changefreq = 'monthly'
    } else if (route === '/process' || route.startsWith('/services/')) {
      priority = 0.7
      changefreq = 'monthly'
    } else if (route === '/blog') {
      priority = 0.6
      changefreq = 'weekly'
    } else if (route.startsWith('/blog/')) {
      priority = 0.5
      changefreq = 'monthly'
    }

    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n')
  }).join('\n')

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
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
