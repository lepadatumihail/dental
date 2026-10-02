import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BookLink } from '@/components/BookLink'
import { FinalCta } from '@/components/FinalCta'
import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { Photo } from '@/components/Photo'
import { Link } from '@/i18n/navigation'
import { TREATMENT_AREAS } from '@/lib/areas'
import { createPageMetadata } from '@/lib/canonical'
import { CLINIC_PHONE, CLINIC_PHONE_E164 } from '@/lib/clinic'
import { simplePageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

// Each area's introduction reuses the summary written for its service page.
const SUMMARY_KEYS = {
  dental: 'layout.services.dental.summary',
  aesthetics: 'layout.services.aesthetics.summary',
  medical: 'layout.services.generalMedicine.summary',
  massage: 'massageTherapy.v2.hero.description',
} as const

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'meta.services' })

  return createPageMetadata({
    path: 'services',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default async function ServicesPage() {
  const t = await getTranslations('treatmentsPage')
  const tAreas = await getTranslations('areas')
  const tSite = await getTranslations('site')
  const tAll = await getTranslations()

  return (
    <>
      <JsonLd data={await simplePageJsonLd('services')} />
      <InnerHero
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', richTags)}
        intro={t('hero.intro')}
      />

      <section className="detail-section treatment-directory">
        {TREATMENT_AREAS.map((area) => {
          const title = tAreas(`${area.key}.title`)
          const summary = tAll.raw(SUMMARY_KEYS[area.key]) as string | string[]
          const services = tAreas.raw(`${area.key}.services`) as Array<string>
          return (
            <article key={area.key} id={area.key}>
              <div className="detail-image">
                <Photo
                  src={area.image}
                  alt={title}
                  fill
                  sizes="(min-width: 700px) 50vw, 100vw"
                />
              </div>
              <div>
                <p className="eyebrow">
                  {area.number} / {tAreas(`${area.key}.lead`)}
                </p>
                <h2>
                  <Link href={area.href}>{title}</Link>
                </h2>
                <p>{Array.isArray(summary) ? summary[0] : summary}</p>
                <div className="detail-tags">
                  {services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </div>
                <div className="hero-actions">
                  <Link className="button dark" href={area.href}>
                    {t('explore', { area: title })} <Arrow />
                  </Link>
                  <BookLink service={area.key} className="text-link">
                    {tSite('bookConsultation')} <Arrow />
                  </BookLink>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="emergency-hotline">
        <p className="eyebrow gold">{t('hotline.eyebrow')}</p>
        <a href={`tel:${CLINIC_PHONE_E164}`}>
          {CLINIC_PHONE} <Arrow />
        </a>
        <span>{t('hotline.note')}</span>
      </section>

      <FinalCta />
    </>
  )
}
