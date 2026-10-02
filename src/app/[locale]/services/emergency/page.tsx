import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Photo } from '@/components/Photo'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { CLINIC_PHONE, CLINIC_PHONE_E164, WHATSAPP_URL } from '@/lib/clinic'
import { emergencyPageJsonLd } from '@/lib/page-graphs'
import { Arrow } from '@/lib/rich'

import imageHero from '@/images/clinic/dentists.jpg'

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
  const t = await getTranslations({ locale, namespace: 'meta.emergency' })

  return createPageMetadata({
    path: 'services/emergency',
    locale,
    title: { absolute: t('title') },
    description: t('description'),
  })
}

const conditionKeys = [
  'toothache',
  'broken',
  'knockedOut',
  'lostRestorations',
  'abscess',
  'trauma',
] as const

const whyChooseFeatures = [
  'availability',
  'sameDay',
  'location',
  'payment',
] as const

const howWorksSteps = ['call', 'describe', 'come'] as const

export default async function EmergencyDentalServices() {
  const t = await getTranslations('emergencyPage')

  return (
    <>
      <JsonLd data={await emergencyPageJsonLd()} />

      <section className="tourism-hero service-hero">
        <div>
          <p className="eyebrow">24 / 7</p>
          <h1>{t('hero.title')}</h1>
          <p className="whitespace-pre-line">{t('hero.description')}</p>
          <div className="hero-actions">
            <a className="button urgent" href={`tel:${CLINIC_PHONE_E164}`}>
              {t('hero.emergencyHotline')} <Arrow />
            </a>
            <a
              className="text-link"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('hero.whatsapp')} <Arrow />
            </a>
          </div>
        </div>
        <div className="tourism-hero-image">
          <Photo
            src={imageHero}
            alt=""
            focus="center top"
            fill
            priority
            sizes="(min-width: 700px) 45vw, 100vw"
          />
        </div>
      </section>

      <section className="emergency-hotline">
        <p className="eyebrow gold">{t('hero.emergencyHotline')}</p>
        <a href={`tel:${CLINIC_PHONE_E164}`}>
          {CLINIC_PHONE} <Arrow />
        </a>
        <span>{t('callToAction.description')}</span>
      </section>

      <section className="statement">
        <div>
          <p className="eyebrow">24/7</p>
          <h2>{t('services.title')}</h2>
        </div>
        <div className="statement-body">
          <p className="whitespace-pre-line">{t('services.description')}</p>
        </div>
      </section>

      <section className="tourism-proof">
        {(['availability', 'response', 'treatment', 'reviews'] as const).map(
          (key) => (
            <div key={key}>
              <strong>{t(`services.stats.${key}.label`)}</strong>
              <span className="stat">{t(`services.stats.${key}.value`)}</span>
            </div>
          ),
        )}
      </section>

      <section className="section-block">
        <div className="split-heading">
          <div>
            <p className="eyebrow">{t('hero.title')}</p>
            <h2>{t('conditions.title')}</h2>
          </div>
          <p>{t('conditions.description')}</p>
        </div>
        <div className="condition-grid">
          {conditionKeys.map((key, index) => (
            <article key={key}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{t(`conditions.items.${key}.title`)}</h3>
              <p>{t(`conditions.items.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Prisma Clinic</p>
            <h2>{t('whyChoose.title')}</h2>
          </div>
        </div>
        <div className="service-grid">
          {whyChooseFeatures.map((key, index) => (
            <article key={key}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{t(`whyChoose.features.${key}.title`)}</h3>
              <p>{t(`whyChoose.features.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="emergency-process dark-section">
        <div>
          <p className="eyebrow gold">24 / 7</p>
          <h2>{t('howWorks.title')}</h2>
        </div>
        <div className="emergency-steps">
          {howWorksSteps.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{t(`howWorks.steps.${step}.title`)}</h3>
              <p>{t(`howWorks.steps.${step}.description`)}</p>
            </article>
          ))}
        </div>
        <div className="emergency-actions">
          <a className="button light" href={`tel:${CLINIC_PHONE_E164}`}>
            {t('callToAction.callNow')} <Arrow />
          </a>
          <a
            className="text-link light-link"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('callToAction.whatsapp')} <Arrow />
          </a>
        </div>
      </section>

      <TestimonialsGrid />

      <section className="cta-band">
        <div>
          <p className="eyebrow gold">24 / 7</p>
          <h2>{t('callToAction.title')}</h2>
          <p>{t('callToAction.description')}</p>
        </div>
        <a className="button urgent" href={`tel:${CLINIC_PHONE_E164}`}>
          {t('callToAction.callNow')} <Arrow />
        </a>
      </section>
    </>
  )
}
