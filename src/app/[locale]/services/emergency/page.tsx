import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Clock,
  FirstAid,
  Phone,
  CalendarCheck,
  MapPin,
  CreditCard,
  ShieldPlus,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr'
import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { createCanonicalMetadata } from '@/lib/canonical'

import imageHero from '@/images/clinic/dentists.jpg'

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params

  return {
    title: '24/7 Emergency Dental Care in Marbella | Prisma Clinic Marbella',
    description:
      'Immediate emergency dental care available 24/7 in Marbella. Same-day appointments for dental emergencies including severe pain, broken teeth, and trauma. Call our hotline now!',
    openGraph: {
      title: '24/7 Emergency Dental Care in Marbella | Prisma Clinic Marbella',
      description:
        'Immediate emergency dental care available 24/7 in Marbella. Same-day appointments for dental emergencies including severe pain, broken teeth, and trauma. Call our hotline now!',
      type: 'website',
    },
    ...createCanonicalMetadata('services/emergency', locale),
  }
}

const conditionKeys = [
  'toothache',
  'broken',
  'knockedOut',
  'lostRestorations',
  'abscess',
  'trauma',
] as const

const whyChooseFeatures = [
  { key: 'availability' as const, Icon: Clock },
  { key: 'sameDay' as const, Icon: CalendarCheck },
  { key: 'location' as const, Icon: MapPin },
  { key: 'payment' as const, Icon: CreditCard },
]

const howWorksSteps = ['call', 'describe', 'come'] as const

export default async function EmergencyDentalServices() {
  const t = await getTranslations('emergencyPage')

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={imageHero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-warm-dark/90 via-warm-dark/75 to-warm-dark/55"
          />
        </div>

        <Container className="py-24 sm:py-32 lg:py-40">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-red-200 uppercase backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400"
                aria-hidden="true"
              />
              24 / 7
            </span>

            <h1
              className="mt-6 text-4xl font-semibold text-white sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: '-1px', lineHeight: 1.08 }}
            >
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed whitespace-pre-line text-white/85 sm:text-xl">
              {t('hero.description')}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="tel:+34673290786"
                className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-red-600"
              >
                <Phone weight="fill" className="h-4 w-4" />
                {t('hero.emergencyHotline')}
              </a>
              <a
                href="https://wa.me/+34673290786"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/20"
              >
                <WhatsappLogo weight="fill" className="h-4 w-4" />
                {t('hero.whatsapp')}
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───── Services Overview + Stats ───── */}
      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mocha/10 text-mocha">
                  <FirstAid weight="duotone" className="h-6 w-6" />
                </span>
                <h2
                  className="mt-6 text-3xl font-semibold text-warm-dark sm:text-4xl"
                  style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
                >
                  {t('services.title')}
                </h2>
                <p className="mt-6 text-base leading-relaxed whitespace-pre-line text-taupe sm:text-xl">
                  {t('services.description')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mocha/10 bg-mocha/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                {(
                  [
                    'availability',
                    'response',
                    'treatment',
                    'reviews',
                  ] as const
                ).map((key) => (
                  <div
                    key={key}
                    className="flex flex-col justify-between bg-surface-100 p-6 sm:p-8"
                  >
                    <p className="text-3xl font-semibold text-mocha sm:text-4xl">
                      {t(`services.stats.${key}.value`)}
                    </p>
                    <p className="mt-3 text-xs font-medium tracking-wider text-taupe uppercase">
                      {t(`services.stats.${key}.label`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───── Conditions ───── */}
      <section className="border-y border-mocha/8 bg-surface-300 py-20 sm:py-24">
        <Container>
          <FadeIn className="max-w-2xl">
            <div className="flex items-center gap-3">
              <ShieldPlus weight="duotone" className="h-6 w-6 text-mocha" />
              <p className="text-xs font-semibold tracking-wider text-mocha uppercase">
                {t('hero.title')}
              </p>
            </div>
            <h2
              className="mt-4 text-3xl font-semibold text-warm-dark sm:text-4xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('conditions.title')}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-taupe">
              {t('conditions.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conditionKeys.map((key) => (
              <FadeIn key={key}>
                <div className="h-full rounded-2xl border border-mocha/8 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <h3 className="text-lg font-semibold text-warm-dark">
                    {t(`conditions.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {t(`conditions.items.${key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Why Choose Us ───── */}
      <section className="py-20 sm:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="text-3xl font-semibold text-warm-dark sm:text-4xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('whyChoose.title')}
            </h2>
          </FadeIn>

          <FadeInStagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseFeatures.map(({ key, Icon }) => (
              <FadeIn key={key}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-mocha/8 bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mocha/10 text-mocha">
                    <Icon weight="duotone" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-warm-dark">
                    {t(`whyChoose.features.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {t(`whyChoose.features.${key}.description`)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── How It Works ───── */}
      <section className="border-y border-mocha/8 bg-surface-300 py-20 sm:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="text-3xl font-semibold text-warm-dark sm:text-4xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('howWorks.title')}
            </h2>
          </FadeIn>

          <FadeInStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {howWorksSteps.map((step, index) => (
              <FadeIn key={step}>
                <div className="relative h-full rounded-2xl border border-mocha/10 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-mocha text-base font-semibold text-white">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-warm-dark">
                    {t(`howWorks.steps.${step}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
                    {t(`howWorks.steps.${step}.description`)}
                  </p>
                  <div
                    className="mt-6 h-1 w-12 rounded-full bg-mocha/30"
                    aria-hidden="true"
                  />
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Reviews ───── */}
      <TestimonialsGrid />

      {/* ───── Final CTA ───── */}
      <section className="pb-24 sm:pb-32">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-warm-dark p-10 sm:p-14">
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-red-500/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-mocha/20 blur-3xl"
              />

              <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.25em] text-red-200 uppercase">
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400"
                      aria-hidden="true"
                    />
                    24 / 7
                  </span>
                  <h2
                    className="mt-5 text-3xl font-semibold text-white sm:text-4xl"
                    style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
                  >
                    {t('callToAction.title')}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
                    {t('callToAction.description')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="tel:+34673290786"
                    className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-red-600"
                  >
                    <Phone weight="fill" className="h-4 w-4" />
                    {t('callToAction.callNow')}
                  </a>
                  <a
                    href="https://wa.me/+34673290786"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-warm-success px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-warm-success/90"
                  >
                    <WhatsappLogo weight="fill" className="h-4 w-4" />
                    {t('callToAction.whatsapp')}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
