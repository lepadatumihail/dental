import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { Link } from '@/i18n/navigation'
import { createPageMetadata } from '@/lib/canonical'
import { WHATSAPP_URL } from '@/lib/clinic'
import { simplePageJsonLd } from '@/lib/page-graphs'
import { Arrow } from '@/lib/rich'
import { SPECIALIST_PROFILES } from '@/lib/specialists'

import dentalImage from '@/images/prisma/areas/dentistry.jpg'
import aestheticsImage from '@/images/prisma/areas/aesthetics.jpg'
import generalImage from '@/images/prisma/areas/medicine.jpg'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'meta.about' })

  return createPageMetadata({
    path: 'about',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

const valueKeys = ['excellence', 'comfort', 'personal'] as const

const specialtyCards = [
  { key: 'dental', href: '/services/dental', image: dentalImage },
  { key: 'aesthetics', href: '/services/aesthetics', image: aestheticsImage },
  { key: 'general', href: '/services/general-medicine', image: generalImage },
] as const

const statKeys = [
  'availability',
  'languages',
  'locations',
  'specialties',
] as const

export default async function About() {
  const t = await getTranslations('about')
  const tPeople = await getTranslations('specialists.people')

  return (
    <>
      <JsonLd data={await simplePageJsonLd('about')} />
      <InnerHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.lead')}
      />

      <section className="statement">
        <div>
          <p className="eyebrow">Prisma Clinic Marbella</p>
        </div>
        <div className="statement-body">
          <p className="statement-lead">{t('hero.body1')}</p>
          <p>{t('hero.body2')}</p>
        </div>
      </section>

      <section className="tourism-proof">
        {statKeys.map((key) => (
          <div key={key}>
            <strong>{t(`stats.${key}.label`)}</strong>
            <span className="text-4xl">{t(`stats.${key}.value`)}</span>
          </div>
        ))}
      </section>

      <section className="section-block">
        <div className="split-heading">
          <div>
            <p className="eyebrow">{t('values.eyebrow')}</p>
            <h2>{t('values.title')}</h2>
          </div>
          <p>{t('values.description')}</p>
        </div>
        <div className="service-grid">
          {valueKeys.map((key, index) => (
            <article key={key}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{t(`values.items.${key}.title`)}</h3>
              <p>{t(`values.items.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="split-heading">
          <div>
            <p className="eyebrow">{t('specialties.eyebrow')}</p>
            <h2>{t('specialties.title')}</h2>
          </div>
          <p>{t('specialties.description')}</p>
        </div>
        <div className="specialist-directory area-cards">
          {specialtyCards.map(({ key, href, image }) => (
            <Link key={key} className="specialist-card" href={href}>
              <div className="specialist-photo">
                <Image
                  src={image}
                  alt={t(`specialties.items.${key}.title`)}
                  fill
                  sizes="(min-width: 1180px) 33vw, (min-width: 700px) 50vw, 100vw"
                />
              </div>
              <div className="specialist-card-copy">
                <h2>{t(`specialties.items.${key}.title`)}</h2>
                <p>{t(`specialties.items.${key}.description`)}</p>
                <div className="profile-note">
                  <strong>
                    {t('specialties.discoverMore')} <b>↗</b>
                  </strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-split light-section">
        <div>
          <p className="eyebrow">{t('team.eyebrow')}</p>
          <h2>{t('team.title')}</h2>
          <p>{t('team.description')}</p>
          <Link className="button dark" href="/specialists">
            {t('team.eyebrow')} <Arrow />
          </Link>
        </div>
        <div className="home-specialist-list">
          {SPECIALIST_PROFILES.map((person) => (
            <Link key={person.slug} href={`/specialists/${person.slug}`}>
              <div>
                <strong>{person.name}</strong>
                <small>{tPeople(`${person.slug}.role`)}</small>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div>
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.description')}</p>
        </div>
        <div className="hero-actions">
          <a
            className="button light"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('cta.primary')} <Arrow />
          </a>
          <Link className="text-link light-link" href="/clinics">
            {t('cta.secondary')} <Arrow />
          </Link>
        </div>
      </section>
    </>
  )
}
