import Image, { type StaticImageData } from 'next/image'

import { BookTrigger } from '@/components/booking/BookButton'
import { Arrow } from '@/lib/rich'

type PageHeroProps = {
  image: StaticImageData
  imageAlt?: string
  eyebrow?: string
  title: string
  description: string
  ctaLabel: string
  emergencyCtaLabel?: string
  emergencyCtaHref?: string
}

/** Service-page opener: headline and CTAs beside a monochrome photo. */
export function PageHero({
  image,
  imageAlt = '',
  eyebrow,
  title,
  description,
  ctaLabel,
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
          <BookTrigger className="button dark">
            {ctaLabel} <Arrow />
          </BookTrigger>
          {emergencyCtaLabel && emergencyCtaHref ? (
            <a className="button urgent" href={emergencyCtaHref}>
              {emergencyCtaLabel} <Arrow />
            </a>
          ) : null}
        </div>
      </div>
      <div className="tourism-hero-image">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 700px) 45vw, 100vw"
        />
      </div>
    </section>
  )
}
