import Image, { type StaticImageData } from 'next/image'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

type LeadExpertProps = {
  image: StaticImageData
  imageAlt: string
  eyebrow?: string
  title: string
  body: string
}

export function LeadExpert({
  image,
  imageAlt,
  eyebrow,
  title,
  body,
}: LeadExpertProps) {
  return (
    <section className="border-y border-mocha/8 bg-surface-100 py-24 sm:py-28">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface-300 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              {eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.18em] text-mocha uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <h2
                className="mt-3 text-3xl font-semibold text-warm-dark sm:text-4xl lg:text-5xl"
                style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
              >
                {title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-taupe sm:text-xl">
                {body}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
