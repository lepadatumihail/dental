import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'es', 'se'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico).*)'],
}
