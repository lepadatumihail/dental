import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { CtaRibbon } from '@/components/CtaRibbon'
import { InnerHero } from '@/components/InnerHero'
import { LocationsSection } from '@/components/LocationsSection'
import { PricingGroups, type PriceGroup } from '@/components/PricingGroups'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { WHATSAPP_URL } from '@/lib/clinic'
import { pricingPageJsonLd } from '@/lib/page-graphs'
import { Arrow } from '@/lib/rich'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'meta.pricing' })

  return createPageMetadata({
    path: 'pricing',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default async function PricingPage() {
  const t = await getTranslations('prices')
  const groups = t.raw('aesthetic.groups') as PriceGroup[]

  return (
    <>
      <JsonLd data={await pricingPageJsonLd(groups)} />
      <InnerHero
        eyebrow={t('aesthetic.eyebrow')}
        title={t('aesthetic.title')}
        intro={t('aesthetic.description')}
        action={
          <a
            className="button dark"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('aesthetic.ctaWhatsapp')} <Arrow />
          </a>
        }
      />

      <section className="section-block">
        <PricingGroups groups={groups} withContainer={false} />
        <p className="price-disclaimer">{t('subtitle')}</p>
      </section>

      <CtaRibbon
        title={t('ribbon.title')}
        subtitle={t('ribbon.subtitle')}
        ctaLabel={t('ribbon.cta')}
      />

      <LocationsSection />
    </>
  )
}
