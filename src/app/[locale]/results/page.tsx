import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { FinalCta } from '@/components/FinalCta'
import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { GOOGLE_REVIEWS_URL } from '@/lib/clinic'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

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
  const t = await getTranslations({ locale, namespace: 'results.meta' })

  return createPageMetadata({
    path: 'results',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function ResultsPage() {
  const t = await getTranslations('results')
  // Same verified Google reviews as the homepage grid, already translated.
  const tReviews = await getTranslations('home.testimonialsGrid')
  const reviews = tReviews.raw('items') as Array<{ name: string; text: string }>

  return (
    <>
      <JsonLd data={await newPageJsonLd('results')} />
      <InnerHero
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', richTags)}
        intro={t('hero.intro')}
      />
      <section className="detail-section result-directory">
        <div className="results-score">
          <strong>5.0</strong>
          <span aria-hidden="true">★★★★★</span>
          <small>{t('score')}</small>
          <a
            className="text-link"
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {tReviews('viewAll')} <Arrow />
          </a>
        </div>
        {reviews.map((review, index) => (
          <blockquote key={review.name}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>“{review.text}”</p>
            <footer>
              {review.name}
              <small>{t('verified')}</small>
            </footer>
          </blockquote>
        ))}
      </section>
      <FinalCta />
    </>
  )
}
