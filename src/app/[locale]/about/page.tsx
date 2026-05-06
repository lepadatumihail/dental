import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Diamond,
  HandHeart,
  Sparkle,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr'
import { getTranslations } from 'next-intl/server'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { createCanonicalMetadata } from '@/lib/canonical'

import dentalImage from '@/images/clinic/xray.jpg'
import aestheticsImage from '@/images/clinic/aesthetics-1.jpg'
import generalImage from '@/images/clinic/dentists.jpg'

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
    title: 'About | Prisma Clinic Marbella',
    description:
      'Prisma Clinic Marbella — high-end dentistry, aesthetic medicine, and everyday healthcare under one calm, considered roof. Two locations in Marbella, open 24/7 for emergencies.',
    ...createCanonicalMetadata('about', locale),
  }
}

const valueItems = [
  { key: 'excellence' as const, Icon: Diamond },
  { key: 'comfort' as const, Icon: Sparkle },
  { key: 'personal' as const, Icon: HandHeart },
]

const specialtyCards = [
  {
    key: 'dental' as const,
    href: '/services/dental',
    image: dentalImage,
  },
  {
    key: 'aesthetics' as const,
    href: '/services/aesthetics',
    image: aestheticsImage,
  },
  {
    key: 'general' as const,
    href: '/services/general-medicine',
    image: generalImage,
  },
]

const statKeys = [
  'availability',
  'languages',
  'locations',
  'specialties',
] as const

const WHATSAPP_HREF = 'https://wa.me/+34673290786'

export default async function About() {
  const t = await getTranslations('about')

  return (
    <>
      {/* ───── Hero / Intro ───── */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-mocha/15 bg-surface-100/80 px-5 py-2 text-[11px] font-semibold tracking-[0.2em] text-mocha uppercase backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-mocha/60"
                aria-hidden="true"
              />
              {t('hero.eyebrow')}
            </span>

            <h1
              className="mt-8 text-4xl font-semibold text-warm-dark sm:text-6xl lg:text-7xl"
              style={{ letterSpacing: '-1.5px', lineHeight: 1.08 }}
            >
              {t('hero.title')}
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-taupe">
              {t('hero.lead')}
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-taupe">
              <p>{t('hero.body1')}</p>
              <p>{t('hero.body2')}</p>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───── Stats ───── */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-mocha/10 bg-mocha/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] lg:grid-cols-4">
              {statKeys.map((key) => (
                <div
                  key={key}
                  className="flex flex-col justify-between bg-surface-100 p-6 sm:p-8"
                >
                  <p className="text-3xl font-semibold text-mocha sm:text-4xl">
                    {t(`stats.${key}.value`)}
                  </p>
                  <p className="mt-3 text-xs font-medium tracking-wider text-taupe uppercase">
                    {t(`stats.${key}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ───── Values ───── */}
      <section className="border-y border-mocha/8 bg-surface-300 py-20 sm:py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wider text-mocha uppercase">
              {t('values.eyebrow')}
            </p>
            <h2
              className="mt-4 text-3xl font-semibold text-warm-dark sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('values.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('values.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {valueItems.map(({ key, Icon }) => (
              <FadeIn key={key}>
                <div className="flex h-full flex-col rounded-2xl border border-mocha/8 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-mocha/10 text-mocha">
                    <Icon weight="duotone" className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-warm-dark">
                    {t(`values.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe sm:text-base">
                    {t(`values.items.${key}.description`)}
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

      {/* ───── Specialties ───── */}
      <section className="py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wider text-mocha uppercase">
              {t('specialties.eyebrow')}
            </p>
            <h2
              className="mt-4 text-3xl font-semibold text-warm-dark sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('specialties.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('specialties.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {specialtyCards.map(({ key, href, image }) => (
              <FadeIn key={key} className="flex">
                <Link href={href} className="flex w-full">
                  <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-mocha/8 bg-white transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <Image
                        src={image}
                        alt={t(`specialties.items.${key}.title`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                      <div>
                        <h3
                          className="text-xl font-semibold text-warm-dark"
                          style={{ letterSpacing: '-0.3px', lineHeight: 1.25 }}
                        >
                          {t(`specialties.items.${key}.title`)}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-taupe sm:text-base">
                          {t(`specialties.items.${key}.description`)}
                        </p>
                      </div>
                      <span className="mt-6 inline-flex w-fit items-center rounded-full border border-mocha/10 bg-surface-100 px-4 py-2 text-sm text-mocha transition-colors duration-150 group-hover:bg-mocha group-hover:text-white">
                        {t('specialties.discoverMore')} &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Team / Lead specialist ───── */}
      <section className="border-y border-mocha/8 bg-surface-300 py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wider text-mocha uppercase">
              {t('team.eyebrow')}
            </p>
            <h2
              className="mt-4 text-3xl font-semibold text-warm-dark sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('team.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('team.description')}
            </p>
          </FadeIn>

          <FadeIn className="mt-14">
            <article className="mx-auto max-w-4xl rounded-2xl border border-mocha/10 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-12">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-12">
                <div className="flex shrink-0 flex-col items-center text-center lg:items-start lg:text-left">
                  <div
                    aria-hidden="true"
                    className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-mocha to-mocha-dark text-3xl font-semibold tracking-tight text-white shadow-[0_8px_24px_rgba(132,102,82,0.25)]"
                    style={{ letterSpacing: '-0.5px' }}
                  >
                    BK
                  </div>
                </div>

                <div>
                  <h3
                    className="text-2xl font-semibold text-warm-dark sm:text-3xl"
                    style={{ letterSpacing: '-0.3px' }}
                  >
                    {t('team.lead.name')}
                  </h3>
                  <p className="mt-2 text-sm font-semibold tracking-wide text-mocha uppercase">
                    {t('team.lead.role')}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-taupe">
                    {t('team.lead.bio')}
                  </p>

                  <div className="mt-6 flex items-baseline gap-3 border-t border-mocha/10 pt-5">
                    <p className="text-xs font-semibold tracking-wider text-taupe uppercase">
                      {t('team.lead.languagesLabel')}
                    </p>
                    <p className="text-sm text-warm-dark">
                      {t('team.lead.languages')}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </FadeIn>

          <FadeIn className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-base leading-relaxed text-taupe">
              {t('team.rest')}
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* ───── Final CTA ───── */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl bg-warm-dark p-10 sm:p-14">
              <div
                aria-hidden="true"
                className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-mocha/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-mocha/15 blur-3xl"
              />

              <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
                <div>
                  <h2
                    className="text-3xl font-semibold text-white sm:text-4xl"
                    style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
                  >
                    {t('cta.title')}
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80">
                    {t('cta.description')}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-warm-success px-6 py-3.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-warm-success/90"
                  >
                    <WhatsappLogo weight="fill" className="h-4 w-4" />
                    {t('cta.primary')}
                  </a>
                  <Link
                    href="/#locations"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-150 hover:bg-white/20"
                  >
                    {t('cta.secondary')}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  )
}
