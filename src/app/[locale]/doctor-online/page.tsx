import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { InnerHero } from '@/components/InnerHero'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import { CLINIC_PHONE, CLINIC_PHONE_E164, whatsappLink } from '@/lib/clinic'
import { newPageJsonLd } from '@/lib/page-graphs'
import { Arrow, richTags } from '@/lib/rich'

const AREAS = ['dental', 'hair', 'skin', 'medical'] as const

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
  const t = await getTranslations({ locale, namespace: 'doctorOnline.meta' })

  return createPageMetadata({
    path: 'doctor-online',
    locale,
    title: t('title'),
    description: t('description'),
  })
}

export default async function DoctorOnlinePage() {
  const t = await getTranslations('doctorOnline')
  const steps = t.raw('steps') as Array<{ title: string; body: string }>
  // Video consultations are arranged over WhatsApp until online payment exists.
  const bookHref = whatsappLink(t('messageGeneral'))

  return (
    <>
      <JsonLd data={await newPageJsonLd('doctorOnline')} />
      <InnerHero
        className="online-hero"
        eyebrow={t('hero.eyebrow')}
        title={t.rich('hero.title', richTags)}
        intro={t('hero.intro')}
        action={
          <a
            className="button dark"
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('hero.cta')} <Arrow />
          </a>
        }
      />

      <section className="online-value">
        {steps.map((step, index) => (
          <div key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </section>

      <section className="doctor-routing">
        <div className="doctor-routing-heading">
          <p className="eyebrow">{t('routing.eyebrow')}</p>
          <h2>{t.rich('routing.title', richTags)}</h2>
          <p>{t('routing.body')}</p>
        </div>
        <div className="routing-list">
          {AREAS.map((area) => {
            const label = t(`routing.areas.${area}.label`)
            return (
              <article key={area}>
                <div>
                  <p className="eyebrow">{label}</p>
                  <h3>{t(`routing.areas.${area}.who`)}</h3>
                  <span>{t(`routing.areas.${area}.body`)}</span>
                </div>
                <a
                  href={whatsappLink(t('message', { area: label }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('routing.bookLabel', { area: label })}
                >
                  <Arrow />
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="online-note">
        <p>{t('note.label')}</p>
        <strong>
          {t.rich('note.body', {
            phone: () => (
              <a href={`tel:${CLINIC_PHONE_E164}`}>{CLINIC_PHONE}</a>
            ),
          })}
        </strong>
      </section>

      <section className="final-cta">
        <div>
          <p className="eyebrow">{t('cta.eyebrow')}</p>
          <h2>{t.rich('cta.title', richTags)}</h2>
        </div>
        <a
          className="button dark"
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('cta.button')} <Arrow />
        </a>
      </section>
    </>
  )
}
