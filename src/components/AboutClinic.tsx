import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

import bgImage from '@/images/clinic/clinic1.jpg'

export function AboutClinic() {
  const t = useTranslations('home.about')

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="scale-105 object-cover blur-[2px]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-warm-dark/80" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-warm-dark/30 via-transparent to-warm-dark/40"
        />
      </div>

      <Container>
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p
            className="text-[11px] font-semibold tracking-[0.25em] text-white/85 uppercase"
            style={{ textShadow: '0 1px 12px rgba(0,0,0,0.35)' }}
          >
            {t('eyebrow')}
          </p>
          <h2
            className="mt-5 text-4xl font-semibold text-white sm:text-5xl"
            style={{
              letterSpacing: '-0.5px',
              lineHeight: 1.15,
              textShadow: '0 2px 24px rgba(0,0,0,0.45)',
            }}
          >
            {t('title')}
          </h2>
          <p
            className="mt-8 text-base leading-relaxed text-white sm:text-xl"
            style={{ textShadow: '0 1px 16px rgba(0,0,0,0.55)' }}
          >
            {t('body')}
          </p>
        </FadeIn>
      </Container>
    </section>
  )
}
