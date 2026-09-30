import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { FinalCta } from '@/components/FinalCta'
import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { Link } from '@/i18n/navigation'
import { createPageMetadata } from '@/lib/canonical'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'
import { SPECIALIST_PROFILES } from '@/lib/specialists'

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
  const t = await getTranslations({ locale, namespace: 'specialists.meta' })

  return createPageMetadata({
    path: 'specialists',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function SpecialistsPage() {
  const t = await getTranslations('specialists')

  return (
    <>
      <JsonLd data={await newPageJsonLd('specialists')} />
      <InnerHero
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', richTags)}
        intro={t('hero.intro')}
      />
      <section className="detail-section specialist-directory">
        {SPECIALIST_PROFILES.map((person) => (
          <Link
            key={person.slug}
            className="specialist-card"
            href={`/specialists/${person.slug}`}
          >
            <div className="specialist-photo">
              <Image
                src={person.image}
                alt={person.name}
                sizes="(min-width: 1180px) 33vw, (min-width: 700px) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
            <div className="specialist-card-copy">
              <p className="eyebrow">{t(`people.${person.slug}.role`)}</p>
              <h2>{person.name}</h2>
              <p>{t(`people.${person.slug}.detail`)}</p>
              <div className="profile-note">
                <strong>
                  {t('card.explore')} <Arrow />
                </strong>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <FinalCta />
    </>
  )
}
