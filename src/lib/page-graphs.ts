// Per-page JSON-LD, localised with the page's own copy. Server-only.

import { getLocale, getTranslations } from 'next-intl/server'

import type { PriceGroup } from '@/components/PricingGroups'
import { EMERGENCY_SERVICE, SERVICES } from '@/lib/clinic'
import {
  pricingPageGraph,
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
    const t = await getTranslations({ locale, namespace: 'booking.meta' })
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
