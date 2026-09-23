// llms.txt (https://llmstxt.org): a plain-Markdown summary of the clinic for
// AI assistants and agents. Built from the same data as the site so it stays
// in sync with prices, services and articles.

import messages from 'locales/en.json'

import type { PriceGroup } from '@/components/PricingGroups'
import { BASE_URL, getCanonicalUrl } from '@/lib/canonical'
import {
  CLINIC_PHONE,
  EMERGENCY_SERVICE,
  LANGUAGES_SPOKEN,
  LOCATIONS,
  SERVICES,
  SOCIAL_PROFILES,
  SPECIALISTS,
  WHATSAPP_URL,
} from '@/lib/clinic'
import { loadArticles } from '@/lib/mdx'

const url = (path: string) => getCanonicalUrl(path, 'en')

function buildLlmsTxt(): string {
  const priceGroups = messages.prices.aesthetic.groups as Array<PriceGroup>
  const lines: Array<string> = [
    '# Prisma Clinic Marbella',
    '',
    `> ${messages.meta.home.description}`,
    '',
    'Prisma Clinic Marbella is a private clinic on the Costa del Sol, Spain, offering dentistry, aesthetic and anti-aging medicine, general medicine and therapeutic massage, with 24/7 emergency dental care. The website is available in English (/en), Spanish (/es) and Swedish (/se).',
    '',
    '## Contact and booking',
    '',
    `- Phone and WhatsApp (24/7): ${CLINIC_PHONE} (${WHATSAPP_URL})`,
    `- Opening hours: ${messages.home.locations.openingHoursValue}`,
    `- Languages spoken: ${LANGUAGES_SPOKEN.join(', ')}`,
    `- [Book an appointment online](${url('contact')}): choose a service and a time; the clinic confirms the visit.`,
    ...LOCATIONS.map(
      (location) =>
        `- ${location.name}: ${location.streetAddress}, ${location.postalCode} ${location.locality}, ${location.region}, Spain ([map](${location.mapsUrl}))`,
    ),
    '',
    '## Services',
    '',
    ...SERVICES.map((service) => {
      const lead = SPECIALISTS.find((person) => person.path === service.path)
      return `- [${service.name}](${url(service.path)}): ${service.summary}${lead ? ` Led by ${lead.name}.` : ''}`
    }),
    `- [${EMERGENCY_SERVICE.name}](${url(EMERGENCY_SERVICE.path)}): ${EMERGENCY_SERVICE.summary}`,
    '',
    '## Specialists',
    '',
    ...SPECIALISTS.map(
      (person) =>
        `- [${person.name}](${url(person.path)}): ${person.jobTitle}${person.languages ? ` (speaks ${person.languages.join(', ')})` : ''}`,
    ),
    '',
    '## Aesthetic treatment prices',
    '',
    `Prices in EUR, from the [price list](${url('pricing')}). ${messages.prices.subtitle}`,
    '',
    ...priceGroups.flatMap((group) => [
      `### ${group.title} (${group.subtitle})`,
      '',
      ...group.items.map((item) => `- ${item.service}: ${item.price}`),
      '',
    ]),
    '## Articles',
    '',
    ...loadArticles().map(
      (article) =>
        `- [${article.title}](${url(article.href)}): ${article.description}`,
    ),
    '',
    '## Optional',
    '',
    `- [About the clinic](${url('about')}): team, values and locations.`,
    `- [All treatments](${url('services')})`,
    `- [Sitio en español](${getCanonicalUrl('', 'es')})`,
    `- [Svensk webbplats](${getCanonicalUrl('', 'se')})`,
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    ...SOCIAL_PROFILES.map((profile) => `- ${profile}`),
    '',
  ]

  return lines.join('\n')
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control':
        'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
