import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { whatsappLink } from '@/lib/clinic'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

// Annual dental plans; copy lives under `memberships.plans.<key>`.
const PLANS = [
  { key: 'individual', price: '599€' },
  { key: 'couple', price: '899€' },
  { key: 'family', price: '1,399€' },
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
  const t = await getTranslations({ locale, namespace: 'memberships.meta' })

  return createPageMetadata({
    path: 'memberships',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function MembershipsPage() {
  const t = await getTranslations('memberships')

  return (
    <>
      <JsonLd data={await newPageJsonLd('memberships')} />
      <InnerHero
        className="membership-hero"
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', richTags)}
        intro={t('hero.intro')}
        action={
          <a className="button dark" href="#memberships">
            {t('hero.cta')} <Arrow />
          </a>
        }
      />

      <section className="membership-group" id="memberships">
        <div className="split-heading">
          <div>
            <p className="eyebrow">{t('group.eyebrow')}</p>
            <h2>{t('group.title')}</h2>
          </div>
          <p>{t('intro.body')}</p>
        </div>
        <div className="membership-cards">
          {PLANS.map((plan, index) => {
            const featured = index === 1
            const name = t(`plans.${plan.key}.name`)
            const benefits = t.raw(
              `plans.${plan.key}.benefits`,
            ) as Array<string>
            return (
              <article key={plan.key} className={featured ? 'featured' : ''}>
                <p className="eyebrow">{t(`plans.${plan.key}.note`)}</p>
                <h3>{name}</h3>
                <div className="membership-price">
                  <strong>{plan.price}</strong>
                  <span>{t('perYear')}</span>
                </div>
                <ul>
                  {benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <a
                  className={
                    featured ? 'button light wide' : 'button dark wide'
                  }
                  href={whatsappLink(
                    t('joinMessage', {
                      plan: `${t('group.eyebrow')} — ${name}`,
                      price: plan.price,
                    }),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('join')} <Arrow />
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="influencer-membership">
        <div>
          <p className="eyebrow">{t('influencer.eyebrow')}</p>
          <h2>{t.rich('influencer.title', richTags)}</h2>
        </div>
        <div>
          <p>{t('influencer.body')}</p>
          <a
            className="button light"
            href={whatsappLink(t('influencer.message'))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('influencer.cta')} <Arrow />
          </a>
        </div>
      </section>
    </>
  )
}
