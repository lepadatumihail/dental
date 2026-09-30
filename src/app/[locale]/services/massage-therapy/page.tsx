import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { AmbientVideo } from '@/components/AmbientVideo'
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
import { WHATSAPP_URL } from '@/lib/clinic'
import { servicePageJsonLd } from '@/lib/page-graphs'

import heroImage from '@/images/clinic/massage-therapy.jpg'
import therapistImage from '@/images/clinic/behrouz-rajabi.jpg'

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
  const t = await getTranslations({ locale, namespace: 'massageTherapy.v2' })

  return createPageMetadata({
    path: 'services/massage-therapy',
    locale,
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
  })
}

export default async function MassageTherapyServices() {
  const t = await getTranslations('massageTherapy.v2')

  return (
    <>
      <JsonLd data={await servicePageJsonLd('massage')} />
      <PageHero
        image={heroImage}
        imageAlt={t('hero.imageAlt')}
        title={t('hero.title')}
        description={t('hero.description')}
        ctaLabel={t('hero.ctaLabel')}
      />

      <InterestSection
        eyebrow={t('interest.eyebrow')}
        title={t('interest.title')}
        subheadline={t('interest.subheadline')}
        body={t('interest.body')}
      />

      <InterestSection
        eyebrow={t('method.eyebrow')}
        title={t('method.title')}
        subheadline={t('method.subheadline')}
        body={t('method.body')}
        media={
          <AmbientVideo
            src="/videos/yumeiho-massage.mp4"
            ariaLabel={t('method.videoAlt')}
            className="aspect-video w-full bg-surface-300 object-cover"
          />
        }
      />

      <ServicesSection
        eyebrow={t('benefits.eyebrow')}
        title={t('benefits.title')}
        body={t('benefits.body')}
        ctaLabel={t('benefits.ctaLabel')}
        ctaHref={WHATSAPP_URL}
        ctaExternal
        items={t.raw('benefits.items') as ServiceItem[]}
      />

      <LeadExpert
        image={therapistImage}
        imageAlt={t('leadExpert.imageAlt')}
        eyebrow={t('leadExpert.eyebrow')}
        title={t('leadExpert.title')}
        body={t('leadExpert.body')}
        profileHref="/specialists/behrouz-rajabi"
      />

      <CtaRibbon
        title={t('ribbon.title')}
        subtitle={t('ribbon.subtitle')}
        ctaLabel={t('ribbon.ctaLabel')}
      />

      <TestimonialsGrid />

      <LocationsSection />

      <section className="px-5 py-10 sm:px-[7vw]">
        <p className="price-disclaimer">{t('disclaimer')}</p>
      </section>
    </>
  )
}
