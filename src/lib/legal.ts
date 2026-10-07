export const LEGAL_PAGES = {
  notice: '/legal-notice',
  terms: '/terms-and-conditions',
  privacy: '/privacy-policy',
  cookies: '/cookie-policy',
} as const

export type LegalPageKey = keyof typeof LEGAL_PAGES
