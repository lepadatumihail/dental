import type { StaticImageData } from 'next/image'
import { useTranslations } from 'next-intl'

import { Photo } from '@/components/Photo'
import { Link } from '@/i18n/navigation'
import { Arrow } from '@/lib/rich'

type LeadExpertProps = {
  image: StaticImageData
  imageAlt: string
  eyebrow?: string
  title: string
  body: string
  /** Specialist profile to link to, e.g. '/specialists/dr-robbin'. */
  profileHref?: string
}

/** Portrait of the lead specialist with a short bio. */
export function LeadExpert({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
  profileHref,
}: LeadExpertProps) {
  const t = useTranslations('specialists.card')

  return (
    <section className="expert-feature">
      <div className="expert-photo">
        <Photo
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 700px) 40vw, 100vw"
        />
      </div>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        <p>{body}</p>
        {profileHref ? (
          <Link className="text-link" href={profileHref}>
            {t('explore')} <Arrow />
          </Link>
        ) : null}
      </div>
    </section>
  )
}
