// Per-page JSON-LD, localised with the page's own copy. Server-only.

import { getLocale, getTranslations } from 'next-intl/server'

import type { PriceGroup } from '@/components/PricingGroups'
import { EMERGENCY_SERVICE, SERVICES, SPECIALISTS } from '@/lib/clinic'
import type { Specialist } from '@/lib/specialists'
import {
  pricingPageGraph,
  profilePageGraph,
  servicePageGraph,
  simplePageGraph,
  type BreadcrumbItem,
} from '@/lib/structured-data'

async function navCrumbs(locale: string) {
  const t = await getTranslations({ locale, namespace: 'layout' })
  const home: BreadcrumbItem = { name: t('header.home'), path: '' }
  const treatments: BreadcrumbItem = {
    name: t('navigation.items.treatments.label'),
    path: 'services',
  }
  return { t, home, treatments }
}

const SERVICE_PAGES = {
  dental: {
    service: 'dental',
    namespace: 'dental.v2',
    nameKey: 'hero.title',
    descriptionKey: 'hero.description',
    specialistId: 'robbin',
  },
  aesthetics: {
    service: 'aesthetic',
    namespace: 'layout.services.aesthetics.v2',
    nameKey: 'hero.title',
    descriptionKey: 'hero.description',
    specialistId: 'bozana-krivosija',
  },
  generalMedicine: {
    service: 'medical',
    namespace: 'generalMedicine.v2',
    nameKey: 'hero.title',
    descriptionKey: 'meta.description',
    specialistId: 'angelo-termini',
  },
  massage: {
    service: 'massage',
    namespace: 'massageTherapy.v2',
    nameKey: 'hero.title',
    descriptionKey: 'meta.description',
    specialistId: 'behrouz-rajabi',
  },
} as const

export async function servicePageJsonLd(page: keyof typeof SERVICE_PAGES) {
  const locale = await getLocale()
  const config = SERVICE_PAGES[page]
  const service = SERVICES.find((s) => s.key === config.service)!
  const t = await getTranslations({ locale, namespace: config.namespace })
  const { t: tLayout, home, treatments } = await navCrumbs(locale)
  const name = t(config.nameKey)

  return servicePageGraph({
    locale,
    path: service.path,
    name,
    description: t(config.descriptionKey),
    serviceType: service.name,
    specialistId: config.specialistId,
    medical: service.key !== 'massage',
    breadcrumbs: [
      home,
      treatments,
      {
        name: tLayout(`navigation.items.treatments.${service.key}`),
        path: service.path,
      },
    ],
  })
}

export async function emergencyPageJsonLd() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'emergencyPage' })
  const tMeta = await getTranslations({ locale, namespace: 'meta.emergency' })
  const { t: tLayout, home } = await navCrumbs(locale)

  return servicePageGraph({
    locale,
    path: EMERGENCY_SERVICE.path,
    name: t('hero.title'),
    description: tMeta('description'),
    serviceType: EMERGENCY_SERVICE.name,
    breadcrumbs: [
      home,
      { name: tLayout('navigation.items.emergencies'), path: EMERGENCY_SERVICE.path },
    ],
  })
}

export async function pricingPageJsonLd(groups: Array<PriceGroup>) {
  const locale = await getLocale()
  const tMeta = await getTranslations({ locale, namespace: 'meta.pricing' })
  const { t: tLayout, home } = await navCrumbs(locale)

  return pricingPageGraph({
    locale,
    name: tMeta('title'),
    description: tMeta('description'),
    groups,
    breadcrumbs: [home, { name: tLayout('navigation.items.ourPrices'), path: 'pricing' }],
  })
}

export async function simplePageJsonLd(
  page: 'about' | 'services' | 'contact',
) {
  const locale = await getLocale()
  const { t: tLayout, home, treatments } = await navCrumbs(locale)

  if (page === 'contact') {
    const t = await getTranslations({ locale, namespace: 'contact.meta' })
    return simplePageGraph({
      locale,
      path: 'contact',
      name: t('title'),
      description: t('description'),
      type: 'ContactPage',
      breadcrumbs: [home, { name: tLayout('navigation.items.contact'), path: 'contact' }],
    })
  }

  const t = await getTranslations({ locale, namespace: `meta.${page}` })
  return simplePageGraph({
    locale,
    path: page,
    name: t('title'),
    description: t('description'),
    type: page === 'about' ? 'AboutPage' : 'CollectionPage',
    breadcrumbs: [
      home,
      page === 'about'
        ? { name: tLayout('navigation.items.theClinic'), path: 'about' }
        : treatments,
    ],
  })
}

// Pages whose copy lives in their own namespace, with `meta.title` and
// `meta.description`; the value is the path and the breadcrumb label key.
const NEW_PAGES = {
  specialists: { path: 'specialists', nav: 'specialists', type: 'CollectionPage' },
  memberships: { path: 'memberships', nav: 'memberships', type: 'WebPage' },
  doctorOnline: { path: 'doctor-online', nav: 'doctorOnline', type: 'WebPage' },
  dentalTourism: { path: 'dental-tourism', nav: 'dentalTourism', type: 'WebPage' },
  prismaCare: { path: 'prisma-care', nav: 'prismaCare', type: 'AboutPage' },
  clinics: { path: 'clinics', nav: 'clinics', type: 'WebPage' },
  results: { path: 'results', nav: null, type: 'WebPage' },
} as const

export async function newPageJsonLd(page: keyof typeof NEW_PAGES) {
  const locale = await getLocale()
  const config = NEW_PAGES[page]
  const t = await getTranslations({ locale, namespace: `${page}.meta` })
  const tSite = await getTranslations({ locale, namespace: 'site' })
  const { home } = await navCrumbs(locale)

  return simplePageGraph({
    locale,
    path: config.path,
    name: t('title'),
    description: t('description'),
    type: config.type,
    breadcrumbs: [
      home,
      {
        name: config.nav ? tSite(`nav.${config.nav}`) : t('title'),
        path: config.path,
      },
    ],
  })
}

export async function specialistPageJsonLd(specialist: Specialist) {
  const locale = await getLocale()
  const person = SPECIALISTS.find(
    (p) => p.path === `specialists/${specialist.slug}`,
  )!
  const t = await getTranslations({
    locale,
    namespace: `specialists.people.${specialist.slug}`,
  })
  const tSite = await getTranslations({ locale, namespace: 'site' })
  const { home } = await navCrumbs(locale)

  return profilePageGraph({
    locale,
    person,
    name: `${specialist.name} — ${t('role')}`,
    description: t('experience'),
    breadcrumbs: [
      home,
      { name: tSite('nav.specialists'), path: 'specialists' },
      { name: specialist.name, path: person.path },
    ],
  })
}
