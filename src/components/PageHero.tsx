import type { StaticImageData } from 'next/image'

import { BookLink, type BookingTopic } from '@/components/BookLink'
import { Photo } from '@/components/Photo'
import { Arrow } from '@/lib/rich'

type PageHeroProps = {
  image: StaticImageData
  imageAlt?: string
  /** CSS `object-position` keeping the subject inside the 4:5 frame. */
  imageFocus?: string
  eyebrow?: string
  title: string
  description: string
  ctaLabel: string
  /** Treatment area named in the pre-filled WhatsApp message. */
  service?: BookingTopic
  emergencyCtaLabel?: string
  emergencyCtaHref?: string
}

/** Service-page opener: headline and CTAs beside a photo. */
export function PageHero({
  image,
  imageAlt = '',
  imageFocus,
  eyebrow,
  title,
  description,
  ctaLabel,
  service,
  emergencyCtaLabel,
  emergencyCtaHref,
}: PageHeroProps) {
  return (
    <section className="tourism-hero service-hero">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="hero-actions">
          <BookLink service={service} className="button dark">
            {ctaLabel} <Arrow />
          </BookLink>
          {emergencyCtaLabel && emergencyCtaHref ? (
            <a className="button urgent" href={emergencyCtaHref}>
              {emergencyCtaLabel} <Arrow />
            </a>
          ) : null}
        </div>
      </div>
      <div className="tourism-hero-image">
        <Photo
          src={image}
          alt={imageAlt}
          focus={imageFocus}
          fill
          priority
          sizes="(min-width: 700px) 45vw, 100vw"
        />
      </div>
    </section>
  )
}
