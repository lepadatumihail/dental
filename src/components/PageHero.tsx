import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

type PageHeroProps = {
  image: StaticImageData
  imageAlt?: string
  eyebrow?: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  ctaExternal?: boolean
}

export function PageHero({
  image,
  imageAlt = '',
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
}: PageHeroProps) {
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-warm-dark/55 via-warm-dark/35 to-warm-dark/70"
        />
      </div>

      <Container className="relative z-10 flex h-full items-center">
        <FadeIn className="w-full">
          <div className="max-w-3xl text-white">
            {eyebrow ? (
              <p className="mb-6 text-xs font-semibold tracking-[0.18em] text-white/85 uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1
              className="text-4xl font-semibold sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: '-1px', lineHeight: 1.08 }}
            >
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
              {description}
            </p>
            <div className="mt-10">
              {ctaExternal ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-warm-dark transition-colors duration-150 hover:bg-surface-200"
                >
                  {ctaLabel}
                </a>
              ) : (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center rounded-lg bg-white px-6 py-3.5 text-sm font-medium text-warm-dark transition-colors duration-150 hover:bg-surface-200"
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
