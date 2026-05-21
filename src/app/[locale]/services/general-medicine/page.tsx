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
import { createCanonicalMetadata } from '@/lib/canonical'

import heroImage from '@/images/clinic/dentists.jpg'
// TODO: replace with a dedicated medical-team photo when provided
import teamImage from '@/images/clinic/clinic1.jpg'

const WHATSAPP_HREF = 'https://wa.me/+34673290786'

interface PageProps {
  params: { locale: string }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'generalMedicine.v2' })

  return {
    title: `${t('hero.title')} — Prisma Clinic Marbella`,
    description: t('hero.description'),
    ...createCanonicalMetadata('services/general-medicine', locale),
  }
}

export default async function GeneralMedicineServices() {
  const t = await getTranslations('generalMedicine.v2')

  return (
    <>
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
        image={teamImage}
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
