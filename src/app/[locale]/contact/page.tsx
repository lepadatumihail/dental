import type { Metadata } from 'next'
import { PaymentInformation } from '@/components/PaymentInformation'
import { getTranslations } from 'next-intl/server'

import { BookLink } from '@/components/BookLink'
import { PageIntro } from '@/components/PageIntro'
import { JsonLd } from '@/components/JsonLd'
import { createPageMetadata } from '@/lib/canonical'
import {
  CLINIC_EMAIL,
  CLINIC_PHONE,
  CLINIC_PHONE_E164,
  LOCATIONS,
  SOCIAL_PROFILES,
  WHATSAPP_URL,
} from '@/lib/clinic'
import { simplePageJsonLd } from '@/lib/page-graphs'
import { Arrow } from '@/lib/rich'

// Each option opens WhatsApp with its own pre-filled message; `general` is
// the catch-all without a treatment area.
const BOOKING_OPTIONS = [
  'dental',
  'aesthetics',
  'medical',
  'massage',
  'general',
] as const

const OFFICES = [
  { key: 'banus', location: 'banus' },
  { key: 'oldTown', location: 'old-town' },
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
  const t = await getTranslations({ locale, namespace: 'contact' })

  return createPageMetadata({
    path: 'contact',
    locale,
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
  })
}

export default async function Contact() {
  const t = await getTranslations('contact')
  const tLocations = await getTranslations('home.locations')

  return (
    <>
      <JsonLd data={await simplePageJsonLd('contact')} />
      <PageIntro eyebrow={t('hero.eyebrow')} title={t('hero.title')}>
        <p>{t('hero.intro')}</p>
      </PageIntro>

      <PaymentInformation />

      <section className="section-block contact-layout">
        <div className="contact-booking">
          <p className="eyebrow">{t('booking.eyebrow')}</p>
          <h2>{t('booking.title')}</h2>
          <p className="contact-lead">{t('booking.body')}</p>
          <div className="booking-options">
            {BOOKING_OPTIONS.map((option, index) => (
              <BookLink
                key={option}
                service={option === 'general' ? undefined : option}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{t(`booking.options.${option}.name`)}</strong>
                  <small>{t(`booking.options.${option}.description`)}</small>
                </div>
                <Arrow />
              </BookLink>
            ))}
          </div>
          <a className="text-link" href={`tel:${CLINIC_PHONE_E164}`}>
            {t('booking.call', { phone: CLINIC_PHONE })} <Arrow />
          </a>
        </div>

        <div className="contact-details">
          <p className="eyebrow">{t('details.locationTitle')}</p>
          <p className="contact-lead">{t('details.locationBody')}</p>

          {OFFICES.map((office) => {
            const location = LOCATIONS.find((l) => l.id === office.location)!
            return (
              <article key={office.key}>
                <h3>{tLocations(`${office.key}.name`)}</h3>
                <address>{tLocations(`${office.key}.address`)}</address>
                <a
                  className="text-link"
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tLocations('directions')} <Arrow />
                </a>
              </article>
            )
          })}

          <dl>
            <div>
              <dt>{tLocations('phoneLabel')}</dt>
              <dd>
                <a href={`tel:${CLINIC_PHONE_E164}`}>{CLINIC_PHONE}</a>
              </dd>
            </div>
            <div>
              <dt>{tLocations('whatsappLabel')}</dt>
              <dd>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {CLINIC_PHONE}
                </a>
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>{tLocations('openingHoursLabel')}</dt>
              <dd>{tLocations('openingHoursValue')}</dd>
            </div>
            <div>
              <dt>{t('details.followTitle')}</dt>
              <dd className="contact-social">
                {SOCIAL_PROFILES.map((href) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {href.includes('instagram') ? 'Instagram' : 'Facebook'}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  )
}
