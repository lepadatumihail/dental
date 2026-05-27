// Date formatting helpers for the booking wizard.

// The project uses 'se' as the Swedish locale code; the correct IANA/Intl
// code for Swedish is 'sv'.
function toIntlLocale(locale: string): string {
  return locale === 'se' ? 'sv' : locale
}

// Parse a YYYY-MM-DD string as a local date (no timezone shift on display).
function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatDateShort(iso: string, locale: string): string {
  return parseLocalDate(iso).toLocaleDateString(toIntlLocale(locale), {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatDateLong(iso: string, locale: string): string {
  return parseLocalDate(iso).toLocaleDateString(toIntlLocale(locale), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}
