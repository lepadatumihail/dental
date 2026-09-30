import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import {
  CLINIC_PHONE,
  CLINIC_PHONE_E164,
  LOCATIONS,
  WHATSAPP_URL,
} from '@/lib/clinic'
import { Arrow } from '@/lib/rich'

type LocationsSectionProps = {
  /** Override the emergency banner title (defaults to the dental copy). */
  emergencyTitle?: string
  /** Override the emergency banner description (defaults to the dental copy). */
  emergencyDescription?: string
}

const OFFICES = [
  { key: 'banus', location: 'banus' },
  { key: 'oldTown', location: 'old-town' },
] as const

/** Both clinics with contact details, followed by the 24/7 emergency strip. */
export function LocationsSection({
  emergencyTitle,
  emergencyDescription,
}: LocationsSectionProps = {}) {
  const t = useTranslations('home.locations')

  return (
    <section className="section-block">
      <div className="split-heading">
        <div>
          <p className="eyebrow">Marbella · Puerto Banús</p>
          <h2>{t('title')}</h2>
        </div>
        <p>{t('description')}</p>
      </div>

      <div className="location-cards">
        {OFFICES.map((office, index) => {
          const location = LOCATIONS.find((l) => l.id === office.location)!
          return (
            <article key={office.key}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{t(`${office.key}.name`)}</h3>
              <address>{t(`${office.key}.address`)}</address>
              <dl>
                <div>
                  <dt>{t('phoneLabel')}</dt>
                  <dd>
                    <a href={`tel:${CLINIC_PHONE_E164}`}>{CLINIC_PHONE}</a>
                  </dd>
                </div>
                <div>
                  <dt>{t('whatsappLabel')}</dt>
                  <dd>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      {CLINIC_PHONE}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{t('openingHoursLabel')}</dt>
                  <dd>{t('openingHoursValue')}</dd>
                </div>
              </dl>
              <a
                className="text-link"
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('directions')} <Arrow />
              </a>
            </article>
          )
        })}
      </div>

      <div className="emergency-strip">
        <div>
          <p className="eyebrow">24/7</p>
          <h3>{emergencyTitle ?? t('emergency.title')}</h3>
          <p>{emergencyDescription ?? t('emergency.description')}</p>
        </div>
        <div>
          <a className="button light" href={`tel:${CLINIC_PHONE_E164}`}>
            {t('emergency.hotline')} <Arrow />
          </a>
          <Link className="text-link light-link" href="/services/emergency">
            {t('emergency.learnMore')} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  )
}
