import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import SmoothScrollLink from '@/components/SmoothScrollLink'
import { createCanonicalMetadata } from '@/lib/canonical'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import logoNeos from '@/images/clients/neoss.svg'
import logoStrauman from '@/images/clients/strauman.svg'
import logoInvisalign from '@/images/clients/invisalign.svg'

import CalendlyButton from '@/components/CalendlyButton'

import dentalImage from '@/images/clinic/xray.jpg'
import aestheticsImage from '@/images/clinic/aesthetics-1.jpg'
import generalImage from '@/images/clinic/dentists.jpg'

const clients = [
  ['Invisalign', logoInvisalign],
  ['Neos', logoNeos],
  ['Strauman', logoStrauman],
  ['Unseal', logoUnseal],
]

const journeySteps = [
  {
    key: 'consultation' as const,
    color: 'bg-timeline-thinking',
    textColor: 'text-timeline-thinking',
    borderColor: 'border-timeline-thinking/30',
  },
  {
    key: 'diagnosis' as const,
    color: 'bg-timeline-grep',
    textColor: 'text-timeline-grep',
    borderColor: 'border-timeline-grep/30',
  },
  {
    key: 'treatment' as const,
    color: 'bg-timeline-read',
    textColor: 'text-timeline-read',
    borderColor: 'border-timeline-read/30',
  },
  {
    key: 'care' as const,
    color: 'bg-timeline-edit',
    textColor: 'text-timeline-edit',
    borderColor: 'border-timeline-edit/30',
  },
]

const serviceCards = [
  {
    key: 'general' as const,
    href: '/services/general-medicine',
    image: generalImage,
  },
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
]

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = params

  return {
    description:
      'Prisma Clinic Marbella offers comprehensive dental care with a focus on patient comfort and beautiful results.',
    ...createCanonicalMetadata('', locale),
  }
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default async function Home({ params }: PageProps) {
  const t = await getTranslations('home')

  return (
    <>
      {/* ───── Hero — Novera centered layout with warm DESIGN.md palette ───── */}
      <section className="pt-20 pb-20 sm:pt-28 sm:pb-32">
        <Container>
          <FadeIn className="flex flex-col items-center text-center">
            <div className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] shadow-[0_8px_16px_rgba(192,133,50,0.12)]">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(192,133,50,0.1)_0%,rgba(192,133,50,0.6)_50%,rgba(192,133,50,0.1)_100%)] opacity-80" />
              <span className="relative flex h-full w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-b from-surface-100/90 to-surface-300/90 px-6 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-dark backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,1)] ring-1 ring-gold/20">
                <svg className="h-2 w-2 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
                {t('tagline')}
                <svg className="h-2 w-2 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </span>
            </div>

            <h1
              className="mt-10 max-w-4xl font-display text-5xl font-medium text-warm-dark sm:text-7xl"
              style={{ letterSpacing: '-2.16px', lineHeight: 1.1 }}
            >
              {t('title')}
            </h1>

            <p className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-warm-dark/55">
              {t('description')}
            </p>

            <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
              <CalendlyButton />
              <SmoothScrollLink
                targetId="services"
                className="inline-flex cursor-pointer items-center rounded-lg border border-gold/20 bg-surface-100 px-3 py-2.5 font-display text-xs font-medium text-warm-dark transition-colors duration-150 hover:border-gold/40 hover:text-accent-hover sm:px-5 sm:py-3 sm:text-sm shadow-sm"
              >
                {t('viewServices')}
              </SmoothScrollLink>
            </div>
          </FadeIn>

        </Container>
      </section>

      {/* ───── Clients — warm surface strip ───── */}
      <section className="border-y border-warm-dark/10 bg-surface-400 py-14">
        <Container>
          <FadeIn className="flex items-center gap-x-8">
            <h2 className="shrink-0 font-display text-sm font-semibold tracking-wide text-warm-dark/60">
              {t('clients.title')}
            </h2>
            <div className="h-px flex-auto bg-warm-dark/10" />
          </FadeIn>
          <FadeInStagger faster>
            <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {clients.map(([client, logo]) => (
                <li key={client} className="flex items-center">
                  <FadeIn>
                    <Image
                      src={logo}
                      alt={client}
                      unoptimized
                      className={`brightness-0 ${
                        (logo as { src: string }).src?.includes('neos')
                          ? 'max-w-20'
                          : ''
                      }`}
                    />
                  </FadeIn>
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Service Pillars — Sensor23-style massive cards ───── */}
      <section id="services" className="py-24 sm:py-32">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="font-display text-4xl font-medium text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.72px', lineHeight: 1.2 }}
            >
              {t('services.title')}
            </h2>
            <p className="mt-6 font-serif text-base leading-relaxed text-warm-dark/55">
              {t('services.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {serviceCards.map(({ key, href, image }) => (
              <FadeIn key={key} className="flex">
                <Link href={href} className="flex w-full">
                  <article className="group relative flex w-full flex-col overflow-hidden rounded-[10px] border border-warm-dark/10 bg-surface-400 transition-all duration-200 hover:shadow-[rgba(0,0,0,0.14)_0px_28px_70px,rgba(0,0,0,0.1)_0px_14px_32px]">
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <Image
                        src={image}
                        alt={`${key} services`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                      <div>
                        <p className="font-mono text-xs font-semibold tracking-wider text-gold/80 uppercase">
                          {t(`services.categories.${key}.title`)}
                        </p>
                        <h3
                          className="mt-3 font-display text-2xl font-medium text-warm-dark"
                          style={{
                            letterSpacing: '-0.325px',
                            lineHeight: 1.25,
                          }}
                        >
                          {t(`services.categories.${key}.heading`)}
                        </h3>
                        <p className="mt-4 font-serif text-base leading-relaxed text-warm-dark/55">
                          {t(`services.categories.${key}.description`)}
                        </p>
                      </div>
                      <span className="mt-8 inline-flex w-fit items-center rounded-full bg-surface-300 px-4 py-2 font-display text-sm text-warm-dark/60 transition-colors duration-150 group-hover:text-accent-hover">
                        {t('discoverMore')} &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Patient Journey — timeline-colored steps ───── */}
      <section className="border-y border-warm-dark/10 bg-surface-300 py-24 sm:py-32">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="font-display text-4xl font-medium text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.72px', lineHeight: 1.2 }}
            >
              {t('journey.title')}
            </h2>
            <p className="mt-6 font-serif text-base leading-relaxed text-warm-dark/55">
              {t('journey.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map(({ key, color, textColor, borderColor }) => (
              <FadeIn key={key}>
                <div
                  className={`relative flex flex-col rounded-[10px] border ${borderColor} bg-surface-200 p-8 transition-shadow duration-200 hover:shadow-[rgba(0,0,0,0.02)_0px_0px_16px,rgba(0,0,0,0.008)_0px_0px_8px]`}
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color} font-mono text-sm font-semibold text-warm-dark`}
                  >
                    {t(`journey.steps.${key}.label`)}
                  </span>
                  <h3
                    className="mt-6 font-display text-xl font-medium text-warm-dark"
                    style={{ letterSpacing: '-0.11px' }}
                  >
                    {t(`journey.steps.${key}.title`)}
                  </h3>
                  <p className="mt-3 font-serif text-sm leading-relaxed text-warm-dark/55">
                    {t(`journey.steps.${key}.description`)}
                  </p>
                  <div
                    className={`mt-6 h-1 w-12 rounded-full ${color}`}
                    aria-hidden="true"
                  />
                </div>
              </FadeIn>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Testimonial — warm serif editorial ───── */}
      <section className="py-24 sm:py-32">
        <Container>
          <FadeIn>
            <figure className="mx-auto max-w-3xl text-center">
              <svg
                className="mx-auto h-8 w-8 text-gold/40"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="mt-8">
                <p
                  className="font-serif text-xl leading-relaxed text-warm-dark sm:text-2xl"
                  style={{ fontFeatureSettings: '"cswh"' }}
                >
                  {t('testimonial.text')}
                </p>
              </blockquote>
              <figcaption className="mt-8">
                <Image
                  src={logoPhobiaDark}
                  alt="Bright Smiles"
                  unoptimized
                  className="mx-auto"
                />
              </figcaption>
            </figure>
          </FadeIn>
        </Container>
      </section>

      {/* ───── Comprehensive Services — detail list ───── */}
      <section className="border-t border-warm-dark/10 bg-surface-300 py-24 sm:py-32">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-semibold tracking-wider text-gold/80 uppercase">
              {t('services.comprehensive.eyebrow')}
            </p>
            <h2
              className="mt-4 font-display text-4xl font-medium text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.72px', lineHeight: 1.2 }}
            >
              {t('services.comprehensive.title')}
            </h2>
            <p className="mt-6 font-serif text-base leading-relaxed text-warm-dark/55">
              {t('services.comprehensive.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {(['general', 'cosmetic', 'restorative', 'pediatric'] as const).map(
              (key) => (
                <FadeIn key={key}>
                  <div className="rounded-[10px] border border-warm-dark/10 bg-surface-200 p-8">
                    <h3
                      className="font-display text-lg font-medium text-warm-dark"
                      style={{ letterSpacing: '-0.11px' }}
                    >
                      {t(`services.comprehensive.list.${key}.title`)}
                    </h3>
                    <p className="mt-3 font-serif text-sm leading-relaxed text-warm-dark/55">
                      {t(`services.comprehensive.list.${key}.description`)}
                    </p>
                  </div>
                </FadeIn>
              ),
            )}
          </FadeInStagger>
        </Container>
      </section>

      {/* ───── Contact / Emergency ───── */}
      <ContactSection />
    </>
  )
}
