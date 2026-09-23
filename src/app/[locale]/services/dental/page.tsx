import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { CtaRibbon } from '@/components/CtaRibbon'
import { InterestSection } from '@/components/InterestSection'
import { LeadExpert } from '@/components/LeadExpert'
import { LocationsSection } from '@/components/LocationsSection'
import { PageHero } from '@/components/PageHero'
import {
  ServicesSection,
  type ServiceItem,
} from '@/components/ServicesSection'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { servicePageJsonLd } from '@/lib/page-graphs'

import heroImage from '@/images/clinic/implant.jpg'
import doctorImage from '@/images/clinic/robin-colour.jpg'

const WHATSAPP_HREF = 'https://wa.me/+34673290786'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'dental.v2' })
  const tMeta = await getTranslations({ locale, namespace: 'meta.dental' })

  return createPageMetadata({
    path: 'services/dental',
    locale,
    title: { absolute: tMeta('title') },
    description: t('hero.description'),
  })
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default async function DentalServices() {
  const t = await getTranslations('dental.v2')

  return (
    <>
      <JsonLd data={await servicePageJsonLd('dental')} />
      <PageHero
        image={heroImage}
        imageAlt={t('hero.imageAlt')}
        title={t('hero.title')}
        description={t('hero.description')}
        ctaLabel={t('hero.ctaLabel')}      />

      <InterestSection
        eyebrow={t('interest.eyebrow')}
        title={t('interest.title')}
        subheadline={t('interest.subheadline')}
        body={t('interest.body')}
      />

      <ServicesSection
        eyebrow={t('ourServices.eyebrow')}
        title={t('ourServices.title')}
        body={t('ourServices.body')}
        ctaLabel={t('ourServices.ctaLabel')}
        ctaHref={WHATSAPP_HREF}
        ctaExternal
        items={t.raw('ourServices.items') as ServiceItem[]}
      />

      <LeadExpert
        image={doctorImage}
        imageAlt={t('leadExpert.imageAlt')}
        eyebrow={t('leadExpert.eyebrow')}
        title={t('leadExpert.title')}
        body={t('leadExpert.body')}
      />

      <CtaRibbon
        title={t('ribbon.title')}
        subtitle={t('ribbon.subtitle')}
        ctaLabel={t('ribbon.ctaLabel')}      />

      <TestimonialsGrid />

      <LocationsSection />
    </>
  )
}
