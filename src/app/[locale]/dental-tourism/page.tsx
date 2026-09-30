import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { JsonLd } from '@/components/JsonLd'
import { TripPlanner } from '@/components/TripPlanner'
import { createPageMetadata } from '@/lib/canonical'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

import dentistry from '@/images/prisma/areas/dentistry.jpg'

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
  const t = await getTranslations({ locale, namespace: 'dentalTourism.meta' })

  return createPageMetadata({
    path: 'dental-tourism',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function DentalTourismPage() {
  const t = await getTranslations('dentalTourism')
  const proof = t.raw('proof') as Array<string>
  const steps = t.raw('process.steps') as Array<{ title: string; body: string }>
  const included = t.raw('included.items') as Array<{
    title: string
    body: string
  }>

  return (
    <>
      <JsonLd data={await newPageJsonLd('dentalTourism')} />
      <section className="tourism-hero">
        <div>
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1>{t.rich('hero.title', richTags)}</h1>
          <p>{t('hero.intro')}</p>
          <a className="button dark" href="#plan">
            {t('hero.cta')} <Arrow />
          </a>
        </div>
        <div className="tourism-hero-image">
          <Image
            src={dentistry}
            alt={t('hero.imageAlt')}
            fill
            priority
            sizes="(min-width: 700px) 45vw, 100vw"
          />
        </div>
      </section>

      <section className="tourism-proof">
        {proof.map((item, index) => (
          <div key={item}>
            <strong>{String(index + 1).padStart(2, '0')}</strong>
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="tourism-process">
        <div>
          <p className="eyebrow">{t('process.eyebrow')}</p>
          <h2>{t.rich('process.title', richTags)}</h2>
        </div>
        <div>
          {steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="trip-planner" id="plan">
        <div className="planner-heading">
          <p className="eyebrow">{t('planner.eyebrow')}</p>
          <h2>{t.rich('planner.title', richTags)}</h2>
          <p>{t('planner.body')}</p>
        </div>
        <TripPlanner />
      </section>

      <section className="tourism-included">
        <div>
          <p className="eyebrow">{t('included.eyebrow')}</p>
          <h2>{t.rich('included.title', richTags)}</h2>
        </div>
        <div className="included-grid">
          {included.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="care-cta">
        <div>
          <p className="eyebrow">{t('cta.eyebrow')}</p>
          <h2>{t.rich('cta.title', richTags)}</h2>
        </div>
        <a className="button light" href="#plan">
          {t('cta.button')} <Arrow />
        </a>
      </section>
    </>
  )
}
