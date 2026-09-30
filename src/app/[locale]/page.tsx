import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { BookTrigger } from '@/components/booking/BookButton'
import { FinalCta } from '@/components/FinalCta'
import { TreatmentTabs } from '@/components/TreatmentTabs'
import { Link } from '@/i18n/navigation'
import { createPageMetadata } from '@/lib/canonical'
import { CLINIC_PHONE, CLINIC_PHONE_E164 } from '@/lib/clinic'
import { Arrow, richTags } from '@/lib/rich'
import { SPECIALIST_PROFILES } from '@/lib/specialists'

import teamInside from '@/images/prisma/team-inside.jpg'
import monogram from '@/images/prisma/brand/prisma-monogram.png'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'meta.home' })

  return createPageMetadata({
    locale,
    title: { absolute: t('title') },
    description: t('description'),
  })
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default async function Home() {
  const t = await getTranslations('landing')
  const tSite = await getTranslations('site')
  const tPeople = await getTranslations('specialists.people')
  const tLocations = await getTranslations('home.locations')
  const reviews = (await getTranslations('home.testimonialsGrid')).raw(
    'items',
  ) as Array<{ name: string; text: string }>
  const review = reviews[0]

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="hero team-hero" id="top">
        <div className="hero-image">
          <Image
            src={teamInside}
            alt={t('hero.imageAlt')}
            fill
            priority
            sizes="(min-width: 700px) 75vw, 100vw"
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow gold">{t('hero.eyebrow')}</p>
          <h1>{t.rich('hero.title', richTags)}</h1>
          <p className="hero-lead">{t('hero.lead')}</p>
          <div className="hero-actions">
            <BookTrigger className="button dark">
              {tSite('bookConsultation')} <Arrow />
            </BookTrigger>
            <Link className="text-link" href="/services">
              {t('hero.explore')} <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-proof">
          <div>
            <strong>2</strong>
            <span>{t('proof.locations')}</span>
          </div>
          <div>
            <strong>{SPECIALIST_PROFILES.length}</strong>
            <span>{t('proof.specialists')}</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>{t('proof.care')}</span>
          </div>
        </div>
      </section>

      {/* ───── Prisma standard ───── */}
      <section className="intro light-section">
        <Image className="intro-monogram" src={monogram} alt="" sizes="520px" />
        <div className="section-label">
          <span>01</span>
          <p>{t('intro.label')}</p>
        </div>
        <div className="intro-main">
          <p className="eyebrow">{t('intro.eyebrow')}</p>
          <h2>{t.rich('intro.title', richTags)}</h2>
          <div className="intro-columns">
            <p>{t('intro.p1')}</p>
            <p>{t('intro.p2')}</p>
          </div>
        </div>
      </section>

      {/* ───── Doctor Online / Memberships ───── */}
      <section className="access-grid">
        <Link href="/doctor-online">
          <p className="eyebrow">{t('access.online.eyebrow')}</p>
          <h3>{t.rich('access.online.title', richTags)}</h3>
          <span>
            {t('access.online.cta')} <Arrow />
          </span>
        </Link>
        <Link href="/memberships">
          <p className="eyebrow">{t('access.memberships.eyebrow')}</p>
          <h3>{t.rich('access.memberships.title', richTags)}</h3>
          <span>
            {t('access.memberships.cta')} <Arrow />
          </span>
        </Link>
      </section>

      {/* ───── Treatments ───── */}
      <section className="treatments home-treatments light-section">
        <div className="treatment-heading">
          <div>
            <p className="eyebrow">{t('treatments.eyebrow')}</p>
            <h2>{t.rich('treatments.title', richTags)}</h2>
          </div>
          <Link className="text-link" href="/services">
            {t('treatments.viewAll')} <Arrow />
          </Link>
        </div>
        <TreatmentTabs />
      </section>

      {/* ───── Specialists ───── */}
      <section className="home-split light-section">
        <div>
          <p className="eyebrow gold">{t('specialists.eyebrow')}</p>
          <h2>{t.rich('specialists.title', richTags)}</h2>
          <p>{t('specialists.body')}</p>
          <Link className="button dark" href="/specialists">
            {t('specialists.cta')} <Arrow />
          </Link>
        </div>
        <div className="home-specialist-list">
          {SPECIALIST_PROFILES.map((person) => (
            <Link key={person.slug} href={`/specialists/${person.slug}`}>
              <span className="specialist-thumb">
                <Image src={person.thumb} alt="" sizes="64px" />
              </span>
              <div>
                <strong>{person.name}</strong>
                <small>{tPeople(`${person.slug}.role`)}</small>
              </div>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      {/* ───── Reviews + locations ───── */}
      <section className="home-proof light-section">
        <div>
          <p className="eyebrow">{t('reviews.eyebrow')}</p>
          <h2>{t.rich('reviews.title', richTags)}</h2>
          <blockquote>“{review.text}”</blockquote>
          <p>
            — {review.name}, {t('reviews.source')}
          </p>
          <Link className="text-link" href="/results">
            {t('reviews.cta')} <Arrow />
          </Link>
        </div>
        <div>
          <p className="eyebrow">{t('find.eyebrow')}</p>
          <h2>{t.rich('find.title', richTags)}</h2>
          {(['banus', 'oldTown'] as const).map((key) => (
            <article key={key}>
              <strong>{tLocations(`${key}.name`)}</strong>
              <span>{tLocations(`${key}.address`)}</span>
            </article>
          ))}
          <Link className="text-link" href="/clinics">
            {t('find.cta')} <Arrow />
          </Link>
        </div>
      </section>

      {/* ───── Emergency ───── */}
      <section className="emergency compact-emergency dark-section">
        <div>
          <p className="eyebrow gold">{t('emergency.eyebrow')}</p>
          <h2>{t.rich('emergency.title', richTags)}</h2>
        </div>
        <div className="emergency-copy">
          <p>{t('emergency.body')}</p>
          <div className="hero-actions">
            <a className="button light" href={`tel:${CLINIC_PHONE_E164}`}>
              {t('emergency.call', { phone: CLINIC_PHONE })} <Arrow />
            </a>
            <Link className="text-link light-link" href="/services/emergency">
              {t('emergency.info')} <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
