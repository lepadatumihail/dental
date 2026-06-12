import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { AmbientVideo } from '@/components/AmbientVideo'
import { Container } from '@/components/Container'
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

import heroImage from '@/images/clinic/massage-therapy.jpg'
import therapistImage from '@/images/clinic/behrouz-rajabi.jpg'

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
  const t = await getTranslations({ locale, namespace: 'massageTherapy.v2' })

  return {
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
    ...createCanonicalMetadata('services/massage-therapy', locale),
  }
}

export default async function MassageTherapyServices() {
  const t = await getTranslations('massageTherapy.v2')

  return (
    <>
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
            className="aspect-video w-full rounded-2xl bg-surface-300 object-cover shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          />
        }
      />

      <ServicesSection
        eyebrow={t('benefits.eyebrow')}
        title={t('benefits.title')}
        body={t('benefits.body')}
        ctaLabel={t('benefits.ctaLabel')}
        ctaHref={WHATSAPP_HREF}
        ctaExternal
        items={t.raw('benefits.items') as ServiceItem[]}
      />

      <LeadExpert
        image={therapistImage}
        imageAlt={t('leadExpert.imageAlt')}
        eyebrow={t('leadExpert.eyebrow')}
        title={t('leadExpert.title')}
        body={t('leadExpert.body')}
      />

      <CtaRibbon
        title={t('ribbon.title')}
        subtitle={t('ribbon.subtitle')}
        ctaLabel={t('ribbon.ctaLabel')}
      />

      <TestimonialsGrid />

      <LocationsSection />

      <section className="border-t border-mocha/8 bg-surface-100 py-10">
        <Container>
          <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-taupe/80">
            {t('disclaimer')}
          </p>
        </Container>
      </section>
    </>
  )
}
