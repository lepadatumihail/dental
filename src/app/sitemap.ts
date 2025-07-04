import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.prismaclinicmarbella.es'
  const locales = ['en', 'es', 'se']
  const currentDate = new Date().toISOString()

  // Define all the routes
  const routes = [
    '', // Home page
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

  // Generate sitemap entries for all locales and routes
  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url =
        route === '' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${route}`

      // Set different priorities and change frequencies based on route type
      let priority = 0.5
      let changeFreq:
        | 'always'
        | 'hourly'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never' = 'monthly'

      if (route === '') {
        priority = 1.0
        changeFreq = 'weekly'
      } else if (route === '/contact') {
        priority = 0.9
        changeFreq = 'monthly'
      } else if (route === '/about' || route === '/services') {
        priority = 0.8
        changeFreq = 'monthly'
      } else if (route === '/services/emergency') {
        priority = 0.8
        changeFreq = 'monthly'
      } else if (route === '/process' || route.startsWith('/services/')) {
        priority = 0.7
        changeFreq = 'monthly'
      } else if (route === '/blog') {
        priority = 0.6
        changeFreq = 'weekly'
      } else if (route.startsWith('/blog/')) {
        priority = 0.5
        changeFreq = 'monthly'
      }

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: changeFreq,
        priority,
      })
    })
  })

  return sitemapEntries
}
