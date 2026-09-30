import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { FinalCta } from '@/components/FinalCta'
import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { LOCATIONS } from '@/lib/clinic'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

import banusReception from '@/images/prisma/clinics/banus-reception.jpg'
import oldTown from '@/images/prisma/clinics/old-town.jpg'

const CLINICS = [
  { key: 'banus', location: 'banus', image: banusReception },
  { key: 'oldTown', location: 'old-town', image: oldTown },
] as const

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
  const t = await getTranslations({ locale, namespace: 'clinics.meta' })

  return createPageMetadata({
    path: 'clinics',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function ClinicsPage() {
  const t = await getTranslations('clinics')
  const tLocations = await getTranslations('home.locations')

  return (
    <>
      <JsonLd data={await newPageJsonLd('clinics')} />
      <InnerHero
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', richTags)}
        intro={t('hero.intro')}
      />
      <section className="detail-section clinic-directory">
        {CLINICS.map((clinic, index) => {
          const location = LOCATIONS.find((l) => l.id === clinic.location)!
          return (
            <article key={clinic.key}>
              <div className="clinic-location-image">
                <Image
                  src={clinic.image}
                  alt={t(`${clinic.key}ImageAlt`)}
                  fill
                  sizes="(min-width: 700px) 50vw, 100vw"
                  placeholder="blur"
                />
              </div>
              <div className="clinic-location-copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p className="eyebrow">{t(`${clinic.key}Label`)}</p>
                <h2>{tLocations(`${clinic.key}.name`)}</h2>
                <address>{tLocations(`${clinic.key}.address`)}</address>
                <p>{t('body')}</p>
                <a
                  className="button dark"
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('directions')} <Arrow />
                </a>
              </div>
            </article>
          )
        })}
      </section>
      <FinalCta />
    </>
  )
}
