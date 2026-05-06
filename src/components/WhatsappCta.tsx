import { useTranslations } from 'next-intl'
import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

const WHATSAPP_HREF = 'https://wa.me/+34673290786'

function PhoneMockup() {
  return (
    <div className="relative mx-auto h-[520px] w-[260px] sm:h-[560px] sm:w-[280px]">
      <div className="absolute inset-0 rounded-[44px] bg-warm-dark shadow-[0_20px_60px_rgba(50,53,26,0.25)]" />
      <div className="absolute inset-[6px] overflow-hidden rounded-[38px] bg-gradient-to-b from-[#1a1d10] to-[#0f1108]">
        <div className="absolute top-3 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="flex h-full flex-col items-center justify-between p-6 pt-12 text-white">
          <div className="text-center">
            <p className="text-[11px] font-medium tracking-wider text-white/55 uppercase">
              WhatsApp Voice Call
            </p>
            <p className="mt-2 font-mono text-sm text-white/70">00:02:31</p>
          </div>

          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-warm-success/30" />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-warm-success/20 ring-1 ring-warm-success/40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-success">
                  <WhatsappLogo
                    weight="fill"
                    className="h-10 w-10 text-white"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold">Prisma Clinic</p>
              <p className="mt-1 text-xs text-white/55">Marbella · 24/7</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-around pb-4">
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10"
            >
              <span className="block h-1 w-1 rounded-full bg-white/70" />
              <span className="mx-0.5 block h-1 w-1 rounded-full bg-white/70" />
              <span className="block h-1 w-1 rounded-full bg-white/70" />
            </button>
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500"
            >
              <Phone weight="fill" className="h-6 w-6 rotate-[135deg] text-white" />
            </button>
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10"
            >
              <Phone weight="fill" className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WhatsappCta() {
  const t = useTranslations('home.whatsapp')

  return (
    <section className="border-y border-mocha/8 bg-surface-300 py-12 sm:py-16">
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8  lg:gap-14">
            <div className="flex justify-center lg:justify-start">
              <PhoneMockup />
            </div>
            <div>
              <h2
                className="text-3xl font-semibold text-warm-dark sm:text-4xl"
                style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
              >
                {t('title')}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-taupe">
                {t('description')}
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-warm-success px-6 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-warm-success/90"
              >
                <WhatsappLogo weight="fill" className="h-5 w-5" />
                {t('cta')}
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
