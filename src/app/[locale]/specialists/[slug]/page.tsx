import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { BookTrigger } from '@/components/booking/BookButton'
import { JsonLd } from '@/components/JsonLd'
import { Link } from '@/i18n/navigation'
import { createPageMetadata } from '@/lib/canonical'
import { specialistPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'
import { SPECIALIST_PROFILES, findSpecialist } from '@/lib/specialists'

interface PageProps {
  params: { locale: string; slug: string }
}

export function generateStaticParams() {
  return ['en', 'es', 'se'].flatMap((locale) =>
    SPECIALIST_PROFILES.map(({ slug }) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = params
  const person = findSpecialist(slug)
  if (!person) return {}
  const t = await getTranslations({
    locale,
    namespace: `specialists.people.${slug}`,
  })

  return createPageMetadata({
    path: `specialists/${slug}`,
    locale,
    title: `${person.name} — ${t('role')}`,
    description: t('experience'),
    image: { url: person.image.src, alt: person.name },
  })
}

const GALLERY_KEYS = ['intro', 'expertise'] as const

export default async function SpecialistProfilePage({ params }: PageProps) {
  const person = findSpecialist(params.slug)
  if (!person) notFound()

  const t = await getTranslations('specialists')
  const tSite = await getTranslations('site')
  const tp = (key: string) => t(`people.${person.slug}.${key}`)
  const languages = t.raw(`people.${person.slug}.languages`) as Array<string>
  const treatments = t.raw(`people.${person.slug}.treatments`) as Array<string>

  return (
    <>
      <JsonLd data={await specialistPageJsonLd(person)} />
      <section className="profile-hero">
        <div className="profile-hero-image">
          <Image
            src={person.image}
            alt={person.name}
            priority
            placeholder="blur"
            sizes="(min-width: 700px) 45vw, 100vw"
          />
        </div>
        <div className="profile-hero-copy">
          <Link className="profile-back" href="/specialists">
            {t('profile.back')}
          </Link>
          <p className="eyebrow">{tp('role')}</p>
          <h1>{person.name}</h1>
          <p className="profile-lead">{tp('experience')}</p>
          <BookTrigger service={person.bookingKey} className="button dark">
            {t('profile.bookWith', { name: person.shortName })} <Arrow />
          </BookTrigger>
        </div>
      </section>

      <section className="profile-overview">
        <div>
          <p className="eyebrow">{t('profile.approach')}</p>
          <blockquote>“{tp('philosophy')}”</blockquote>
        </div>
        <div>
          <p>{tp('detail')}</p>
          <div className="profile-languages">
            <span>{t('profile.languages')}</span>
            <p>{languages.join(' · ')}</p>
          </div>
        </div>
      </section>

      <section className="profile-treatments">
        <div>
          <p className="eyebrow">{t('profile.expertise')}</p>
          <h2>{t('profile.howCanHelp', { name: person.shortName })}</h2>
        </div>
        <div className="profile-treatment-list">
          {treatments.map((treatment, index) => (
            <div key={treatment}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{treatment}</strong>
            </div>
          ))}
        </div>
      </section>

      <section
        className="profile-gallery"
        aria-label={t('profile.galleryLabel', { name: person.shortName })}
      >
        {person.gallery.map((image, index) => (
          <figure key={image.src}>
            <Image
              src={image}
              alt={t(`profile.galleryAlt.${GALLERY_KEYS[index]}`, {
                name: person.shortName,
              })}
              sizes="(min-width: 700px) 50vw, 100vw"
              placeholder="blur"
            />
          </figure>
        ))}
      </section>

      <section className="profile-cta">
        <div>
          <p className="eyebrow">{t('profile.ctaEyebrow')}</p>
          <h2>{t.rich('profile.ctaTitle', richTags)}</h2>
        </div>
        <BookTrigger service={person.bookingKey} className="button light">
          {tSite('bookYourConsultation')} <Arrow />
        </BookTrigger>
      </section>
    </>
  )
}
