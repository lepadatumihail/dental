import { NextResponse } from 'next/server'

const BASE_URL = 'https://www.prismaclinicmarbella.es'
const LOCALES = ['en', 'es', 'se']

export async function GET() {
  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...LOCALES.map((locale) => {
      const loc = `${BASE_URL}/${locale}/sitemap.xml`
      return [
        '  <sitemap>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${new Date().toISOString()}</lastmod>`,
        '  </sitemap>',
      ].join('\n')
    }),
    '</sitemapindex>',
  ].join('\n')

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
