import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { PageIntro } from '@/components/PageIntro'
import { ContactBooking } from '@/components/booking/ContactBooking'
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
  const t = await getTranslations({ locale, namespace: 'booking' })

  return createPageMetadata({
    path: 'contact',
    locale,
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
  })
}

export default async function Contact() {
  const t = await getTranslations('booking')
  const tLocations = await getTranslations('home.locations')

  return (
    <>
      <JsonLd data={await simplePageJsonLd('contact')} />
      <PageIntro eyebrow={t('inline.eyebrow')} title={t('inline.title')}>
        <p>{t('inline.intro')}</p>
      </PageIntro>

      <section className="section-block contact-layout">
        <div className="contact-booking">
          <ContactBooking />
        </div>

        <div className="contact-details">
          <p className="eyebrow">{t('contact.locationTitle')}</p>
          <p className="contact-lead">{t('contact.locationBody')}</p>

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
              <dt>{t('contact.followTitle')}</dt>
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
