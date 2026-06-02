import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { AboutClinic } from '@/components/AboutClinic'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HeroSlideshow } from '@/components/HeroSlideshow'
import { LocationsSection } from '@/components/LocationsSection'
import { TestimonialsGrid } from '@/components/TestimonialsGrid'
import { WhatsappCta } from '@/components/WhatsappCta'
import { createCanonicalMetadata } from '@/lib/canonical'

import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import logoNeos from '@/images/clients/neoss.svg'
import logoStrauman from '@/images/clients/strauman.svg'
import logoInvisalign from '@/images/clients/invisalign.svg'

import dentalImage from '@/images/clinic/xray.jpg'
import aestheticsImage from '@/images/clinic/aesthetics-1.jpg'
import generalImage from '@/images/clinic/general-medicine.jpg'

const clients = [
  ['Invisalign', logoInvisalign],
  ['Neos', logoNeos],
  ['Strauman', logoStrauman],
  ['Unseal', logoUnseal],
]

const journeySteps = [
  {
    key: 'consultation' as const,
    color: 'bg-step-consult',
    textColor: 'text-step-consult',
    borderColor: 'border-step-consult/30',
  },
  {
    key: 'diagnosis' as const,
    color: 'bg-step-diagnose',
    textColor: 'text-step-diagnose',
    borderColor: 'border-step-diagnose/30',
  },
  {
    key: 'treatment' as const,
    color: 'bg-step-treat',
    textColor: 'text-step-treat',
    borderColor: 'border-step-treat/30',
  },
  {
    key: 'care' as const,
    color: 'bg-step-care',
    textColor: 'text-step-care',
    borderColor: 'border-step-care/30',
  },
]

const treatmentCards = [
  {
    key: 'dental' as const,
    href: '/services/dental',
    image: dentalImage,
  },
  {
    key: 'antiAging' as const,
    href: '/services/aesthetics',
    image: aestheticsImage,
  },
  {
    key: 'general' as const,
    href: '/services/general-medicine',
    image: generalImage,
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
      {/* ───── Hero Slideshow ───── */}
      <HeroSlideshow />

      {/* ───── Clients ───── */}
      <section className="border-y border-mocha/8 bg-surface-300 py-14">
        <Container>
          <FadeIn className="flex items-center gap-x-8">
            <h2 className="shrink-0 text-sm font-semibold tracking-wide text-taupe">
              {t('clients.title')}
            </h2>
            <div className="h-px flex-auto bg-mocha/10" />
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

      {/* ───── Treatments — Everything in One Place ───── */}
      <section id="treatments" className="py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="text-4xl font-semibold text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('treatments.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('treatments.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {treatmentCards.map(({ key, href, image }) => (
              <FadeIn key={key} className="flex">
                <Link href={href} className="flex w-full">
                  <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-mocha/8 bg-white transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <Image
                        src={image}
                        alt={t(`treatments.cards.${key}.title`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                      <div>
                        <h3
                          className="text-2xl font-semibold text-warm-dark"
                          style={{ letterSpacing: '-0.3px', lineHeight: 1.25 }}
                        >
                          {t(`treatments.cards.${key}.title`)}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-taupe">
                          {t(`treatments.cards.${key}.description`)}
                        </p>
                      </div>
                      <span className="mt-8 inline-flex w-fit items-center rounded-full border border-mocha/10 bg-surface-100 px-4 py-2 text-sm text-mocha transition-colors duration-150 group-hover:bg-mocha group-hover:text-white">
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

      {/* ───── Patient Journey ───── */}
      <section className="border-y border-mocha/8 bg-surface-300 py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="text-4xl font-semibold text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('journey.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('journey.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map(({ key, color, borderColor }) => (
              <FadeIn key={key}>
                <div
                  className={`relative flex flex-col rounded-xl border ${borderColor} bg-white p-8 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]`}
                >
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color} text-sm font-semibold text-forest`}
                  >
                    {t(`journey.steps.${key}.label`)}
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-warm-dark">
                    {t(`journey.steps.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">
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

      {/* ───── WhatsApp CTA ───── */}
      <WhatsappCta />

      {/* ───── About Clinic ───── */}
      <AboutClinic />

      {/* ───── Testimonials Grid ───── */}
      <TestimonialsGrid />

      {/* ───── Locations + Emergency ───── */}
      <LocationsSection />
    </>
  )
}
