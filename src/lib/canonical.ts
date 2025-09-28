import { headers } from 'next/headers'

export const BASE_URL = 'https://www.prismaclinicmarbella.es'

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
 * Generates canonical URL from current request headers (for server components)
 * This is useful when you need to get the canonical URL based on the current request
 */
export function getCanonicalUrlFromHeaders(): string {
  const headersList = headers()
  const host = headersList.get('host') || 'www.prismaclinicmarbella.es'
  const pathname = headersList.get('x-pathname') || '/'
  
  // Use BASE_URL instead of the actual host to ensure consistency
  return `${BASE_URL}${pathname}`
}

/**
 * Generates alternate URLs for different locales
 * @param path - The path without locale
 * @param locales - Array of supported locales
 * @returns Object with locale codes as keys and URLs as values
 */
export function getAlternateUrls(
  path: string = '', 
  locales: string[] = ['en', 'es', 'se']
): Record<string, string> {
  const alternates: Record<string, string> = {}
  
  locales.forEach(locale => {
    alternates[locale] = getCanonicalUrl(path, locale)
  })
  
  return alternates
}

/**
 * Creates metadata object with canonical and alternate URLs
 * @param path - The path without locale
 * @param locale - Current locale
 * @param locales - Array of supported locales
 */
export function createCanonicalMetadata(
  path: string = '',
  locale: string = 'en',
  locales: string[] = ['en', 'es', 'se']
) {
  return {
    alternates: {
      canonical: getCanonicalUrl(path, locale),
      languages: getAlternateUrls(path, locales)
    }
  }
}
