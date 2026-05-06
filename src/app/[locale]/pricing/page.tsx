import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { Container } from '@/components/Container'
import { CtaRibbon } from '@/components/CtaRibbon'
import { FadeIn } from '@/components/FadeIn'
import { LocationsSection } from '@/components/LocationsSection'
import { PricingGroups, type PriceGroup } from '@/components/PricingGroups'
import { createCanonicalMetadata } from '@/lib/canonical'

const WHATSAPP_HREF = 'https://wa.me/+34673290786'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'prices' })

  return {
    title: `${t('title')} — Prisma Clinic Marbella`,
    description: t('subtitle'),
    ...createCanonicalMetadata('pricing', locale),
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default async function PricingPage() {
  const t = await getTranslations('prices')
  const groups = t.raw('aesthetic.groups') as PriceGroup[]

  return (
    <>
      {/* ───── Aesthetic Treatments ───── */}
      <section className="py-24 sm:py-32">
        <Container>
          <FadeIn className="mx-auto max-w-3xl text-center">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-mocha uppercase">
              {t('aesthetic.eyebrow')}
            </span>
            <h1
              className="mt-4 text-4xl font-semibold text-warm-dark sm:text-5xl lg:text-6xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('aesthetic.title')}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-taupe sm:text-xl">
              {t('aesthetic.description')}
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-lg bg-warm-success px-6 py-3.5 text-sm font-medium text-white shadow-[0_4px_16px_rgba(90,122,94,0.25)] transition-all duration-150 hover:bg-warm-success/90 hover:shadow-[0_6px_20px_rgba(90,122,94,0.3)]"
              >
                <WhatsappLogo weight="fill" className="h-5 w-5" />
                {t('aesthetic.ctaWhatsapp')}
              </a>
            </div>
          </FadeIn>

          <div className="mt-20">
            <PricingGroups groups={groups} withContainer={false} />
          </div>
        </Container>
      </section>

      <CtaRibbon
        title={t('ribbon.title')}
        subtitle={t('ribbon.subtitle')}
        ctaLabel={t('ribbon.cta')}
        ctaHref="/contact"
      />

      <LocationsSection />
    </>
  )
}
