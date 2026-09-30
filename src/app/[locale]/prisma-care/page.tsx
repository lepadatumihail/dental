import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { whatsappLink } from '@/lib/clinic'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

import teamInside from '@/images/prisma/team-inside.jpg'
import lounge from '@/images/prisma/clinics/lounge.jpg'

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
  const t = await getTranslations({ locale, namespace: 'prismaCare.meta' })

  return createPageMetadata({
    path: 'prisma-care',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function PrismaCarePage() {
  const t = await getTranslations('prismaCare')
  const pillars = t.raw('pillars') as Array<{ title: string; body: string }>

  return (
    <>
      <JsonLd data={await newPageJsonLd('prismaCare')} />
      <section className="care-hero">
        <div className="care-hero-image">
          <Image
            src={teamInside}
            alt={t('hero.imageAlt')}
            fill
            priority
            sizes="(min-width: 700px) 50vw, 100vw"
          />
        </div>
        <div>
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t.rich('hero.title', richTags)}</h1>
          <p>{t('hero.intro')}</p>
          <a className="button dark" href="#mission">
            {t('hero.cta')} <Arrow />
          </a>
        </div>
      </section>

      <section className="care-statement" id="mission">
        <p className="eyebrow">{t('statement.eyebrow')}</p>
        <h2>{t.rich('statement.title', richTags)}</h2>
        <p>{t('statement.body')}</p>
      </section>

      <section className="care-pillars">
        {pillars.map((pillar, index) => (
          <article key={pillar.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="care-feature">
        <div className="care-feature-image">
          <Image
            src={lounge}
            alt={t('feature.imageAlt')}
            fill
            sizes="(min-width: 700px) 55vw, 100vw"
          />
        </div>
        <div>
          <p className="eyebrow">{t('feature.eyebrow')}</p>
          <h2>{t.rich('feature.title', richTags)}</h2>
          <p>{t('feature.body')}</p>
          <a
            className="text-link"
            href={whatsappLink(t('feature.message'))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('feature.cta')} <Arrow />
          </a>
        </div>
      </section>

      <section className="care-cta">
        <div>
          <p className="eyebrow">{t('cta.eyebrow')}</p>
          <h2>{t.rich('cta.title', richTags)}</h2>
        </div>
        <a
          className="button light"
          href={whatsappLink(t('cta.message'))}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('cta.button')} <Arrow />
        </a>
      </section>
    </>
  )
}
