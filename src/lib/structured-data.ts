// schema.org JSON-LD builders. Entities reference each other by `@id` so the
// per-page graphs link back to the site-wide organisation and clinics.

import {
  BASE_URL,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  getCanonicalUrl,
} from '@/lib/canonical'
import {
  CLINIC_PHONE_E164,
  LANGUAGES_SPOKEN,
  LOCATIONS,
  SOCIAL_PROFILES,
  SPECIALISTS,
  type ClinicLocation,
  type ClinicSpecialist,
} from '@/lib/clinic'
import { languageTag } from '@/lib/locales'
import type { PriceGroup } from '@/components/PricingGroups'

type Thing = Record<string, unknown>

export const ORGANIZATION_ID = `${BASE_URL}/#organization`
export const WEBSITE_ID = `${BASE_URL}/#website`

const locationId = (location: ClinicLocation) => `${BASE_URL}/#clinic-${location.id}`
const specialistId = (id: string) => `${BASE_URL}/#person-${id}`

const OPEN_24_7 = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  opens: '00:00',
  closes: '23:59',
}

const AREA_SERVED = [
  { '@type': 'City', name: 'Marbella' },
  { '@type': 'Place', name: 'Puerto Banús' },
  { '@type': 'AdministrativeArea', name: 'Costa del Sol' },
]

function reserveAction(locale: string): Thing {
  return {
    '@type': 'ReserveAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: getCanonicalUrl('contact', locale),
      inLanguage: languageTag(locale),
      actionPlatform: [
        'https://schema.org/DesktopWebPlatform',
        'https://schema.org/MobileWebPlatform',
      ],
    },
    result: { '@type': 'Reservation', name: 'Clinic appointment' },
  }
}

/** Organisation, both clinic locations and the website. Rendered on every page. */
export function siteGraph(locale: string, description: string): Thing {
  const organization: Thing = {
    '@type': 'MedicalOrganization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: getCanonicalUrl('', locale),
    logo: `${BASE_URL}/logo-small.png`,
    image: `${BASE_URL}${DEFAULT_OG_IMAGE.url}`,
    description,
    telephone: CLINIC_PHONE_E164,
    sameAs: SOCIAL_PROFILES,
    knowsLanguage: LANGUAGES_SPOKEN,
    areaServed: AREA_SERVED,
    medicalSpecialty: ['Dentistry', 'PrimaryCare'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CLINIC_PHONE_E164,
      contactType: 'reservations',
      availableLanguage: LANGUAGES_SPOKEN,
      hoursAvailable: OPEN_24_7,
    },
    subOrganization: LOCATIONS.map((location) => ({ '@id': locationId(location) })),
    employee: SPECIALISTS.map((person) => ({ '@id': specialistId(person.id) })),
    potentialAction: reserveAction(locale),
  }

  const clinics = LOCATIONS.map((location) => ({
    '@type': ['MedicalClinic', 'Dentist'],
    '@id': locationId(location),
    name: location.name,
    url: getCanonicalUrl('', locale),
    image: `${BASE_URL}${DEFAULT_OG_IMAGE.url}`,
    telephone: CLINIC_PHONE_E164,
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    isAcceptingNewPatients: true,
    medicalSpecialty: ['Dentistry', 'PrimaryCare'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.streetAddress,
      postalCode: location.postalCode,
      addressLocality: location.locality,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    hasMap: location.mapsUrl,
    openingHoursSpecification: OPEN_24_7,
    parentOrganization: { '@id': ORGANIZATION_ID },
    potentialAction: reserveAction(locale),
  }))

  const website: Thing = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: BASE_URL,
    inLanguage: ['en', 'es', 'sv'],
    publisher: { '@id': ORGANIZATION_ID },
  }

  const people = SPECIALISTS.map((person) => specialistPerson(person, locale))

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, ...clinics, ...people, website],
  }
}

export interface BreadcrumbItem {
  name: string
  /** Path without locale; '' for the home page. */
  path: string
}

export function breadcrumbList(locale: string, items: Array<BreadcrumbItem>): Thing {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path, locale),
    })),
  }
}

function webPage({
  locale,
  path,
  name,
  description,
  type = 'WebPage',
  about,
  mentions,
}: {
  locale: string
  path: string
  name: string
  description: string
  type?: string
  about?: Thing
  mentions?: Thing
}): Thing {
  const url = getCanonicalUrl(path, locale)
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: languageTag(locale),
    isPartOf: { '@id': WEBSITE_ID },
    ...(about && { about }),
    ...(mentions && { mentions }),
  }
}

function specialistPerson(person: ClinicSpecialist, locale: string): Thing {
  return {
    '@type': 'Person',
    '@id': specialistId(person.id),
    name: person.name,
    jobTitle: person.jobTitle,
    url: getCanonicalUrl(person.path, locale),
    worksFor: { '@id': ORGANIZATION_ID },
    ...(person.specialties.length > 0 && {
      knowsAbout: person.specialties.map((s) => `https://schema.org/${s}`),
    }),
    ...(person.languages && { knowsLanguage: person.languages }),
  }
}

/** A service page: WebPage + Service (+ the specialist who leads it) + breadcrumbs. */
export function servicePageGraph({
  locale,
  path,
  name,
  description,
  serviceType,
  specialistId: leadId,
  breadcrumbs,
  medical = true,
}: {
  locale: string
  path: string
  name: string
  description: string
  serviceType: string
  specialistId?: string
  breadcrumbs: Array<BreadcrumbItem>
  /** Medical services get a MedicalWebPage; wellness services a plain WebPage. */
  medical?: boolean
}): Thing {
  const url = getCanonicalUrl(path, locale)
  const service: Thing = {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    url,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: AREA_SERVED,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: getCanonicalUrl('contact', locale),
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: CLINIC_PHONE_E164,
        hoursAvailable: OPEN_24_7,
      },
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage({
        locale,
        path,
        name,
        description,
        type: medical ? 'MedicalWebPage' : 'WebPage',
        about: { '@id': `${url}#service` },
        ...(leadId && { mentions: { '@id': specialistId(leadId) } }),
      }),
      service,
      breadcrumbList(locale, breadcrumbs),
    ],
  }
}

/** A plain page with breadcrumbs (about, services index, contact, blog index). */
export function simplePageGraph({
  locale,
  path,
  name,
  description,
  type,
  breadcrumbs,
}: {
  locale: string
  path: string
  name: string
  description: string
  type?: string
  breadcrumbs: Array<BreadcrumbItem>
}): Thing {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage({ locale, path, name, description, type }),
      breadcrumbList(locale, breadcrumbs),
    ],
  }
}

function priceSpecification(raw: string): Thing | null {
  const amounts = (raw.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) =>
    Number(n.replace(',', '.')),
  )
  if (amounts.length === 0) return null // "On consultation"
  const base = { '@type': 'PriceSpecification', priceCurrency: 'EUR' }
  if (amounts.length >= 2) {
    return { ...base, minPrice: amounts[0], maxPrice: amounts[amounts.length - 1] }
  }
  // "from 500€" / "desde 500€" / "från 500€": leading words mean a minimum price.
  if (/^\D*[a-zA-ZÀ-ÿ]/.test(raw.trim())) {
    return { ...base, minPrice: amounts[0] }
  }
  return { ...base, price: amounts[0] }
}

/** Pricing page: WebPage + the price list as an OfferCatalog. */
export function pricingPageGraph({
  locale,
  name,
  description,
  groups,
  breadcrumbs,
}: {
  locale: string
  name: string
  description: string
  groups: Array<PriceGroup>
  breadcrumbs: Array<BreadcrumbItem>
}): Thing {
  const url = getCanonicalUrl('pricing', locale)
  const catalog: Thing = {
    '@type': 'OfferCatalog',
    '@id': `${url}#prices`,
    name,
    itemListElement: groups.map((group) => ({
      '@type': 'OfferCatalog',
      name: group.title,
      description: group.subtitle,
      itemListElement: group.items.map((item) => {
        const spec = priceSpecification(item.price)
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${group.title}: ${item.service}`,
            provider: { '@id': ORGANIZATION_ID },
          },
          ...(spec ? { priceSpecification: spec } : { description: item.price }),
          seller: { '@id': ORGANIZATION_ID },
        }
      }),
    })),
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      webPage({ locale, path: 'pricing', name, description, about: { '@id': `${url}#prices` } }),
      catalog,
      breadcrumbList(locale, breadcrumbs),
    ],
  }
}

/** Blog post: BlogPosting + breadcrumbs. Posts are English only. */
export function articleGraph({
  slug,
  title,
  description,
  date,
  authorName,
}: {
  slug: string
  title: string
  description: string
  date: string
  authorName: string
}): Thing {
  const url = getCanonicalUrl(`blog/${slug}`, 'en')
  const author =
    authorName === SITE_NAME
      ? { '@id': ORGANIZATION_ID }
      : { '@type': 'Person', name: authorName }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: title,
        description,
        datePublished: date,
        dateModified: date,
        inLanguage: 'en',
        url,
        mainEntityOfPage: url,
        image: `${BASE_URL}${DEFAULT_OG_IMAGE.url}`,
        author,
        publisher: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': WEBSITE_ID },
      },
      breadcrumbList('en', [
        { name: 'Home', path: '' },
        { name: 'Blog', path: 'blog' },
        { name: title, path: `blog/${slug}` },
      ]),
    ],
  }
}
