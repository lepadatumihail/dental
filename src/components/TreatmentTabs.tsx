'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { TREATMENT_AREAS } from '@/lib/areas'
import { Arrow } from '@/lib/rich'

/** Homepage treatment explorer: area tabs beside a photo and service chips. */
export function TreatmentTabs() {
  const t = useTranslations('areas')
  const tLanding = useTranslations('landing.treatments')
  const [active, setActive] = useState(0)
  const area = TREATMENT_AREAS[active]
  const services = t.raw(`${area.key}.services`) as Array<string>

  return (
    <div className="treatment-layout">
      <div className="treatment-tabs" role="tablist">
        {TREATMENT_AREAS.map((item, index) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? 'treatment-tab active' : 'treatment-tab'}
            onClick={() => setActive(index)}
          >
            <span>{item.number}</span>
            <div>
              <strong>{t(`${item.key}.title`)}</strong>
              <small>{t(`${item.key}.lead`)}</small>
            </div>
            <b aria-hidden="true">↗</b>
          </button>
        ))}
      </div>
      <div className="treatment-panel" role="tabpanel">
        <div className="treatment-image">
          {TREATMENT_AREAS.map((item, index) => (
            <Image
              key={item.key}
              src={item.image}
              alt={t(`${item.key}.title`)}
              fill
              sizes="(min-width: 1180px) 60vw, 100vw"
              className={
                index === active
                  ? 'opacity-100 transition-opacity duration-300'
                  : 'opacity-0 transition-opacity duration-300'
              }
            />
          ))}
        </div>
        <div className="service-list">
          {services.slice(0, 4).map((service) => (
            <span key={service}>{service}</span>
          ))}
          <Link className="button dark" href={area.href}>
            {tLanding('discover')} <Arrow />
          </Link>
        </div>
      </div>
    </div>
  )
}
