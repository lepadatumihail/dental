import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'es', 'se'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/public/*': '/public/*',
  },
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|og-image\\.jpg|logo-small\\.png|logo-dark\\.png|logo-light\\.png|logo\\.jpeg|sitemap\\.xml|robots\\.txt).*)',
  ],
}
