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
      {/* ───── Hero ───── */}
      <section className="pt-20 pb-20 sm:pt-28 sm:pb-32">
        <Container>
          <FadeIn className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-mocha/15 bg-surface-100/80 px-5 py-2 text-[11px] font-semibold tracking-[0.2em] text-mocha uppercase backdrop-blur-sm">
              <span
                className="h-1.5 w-1.5 rounded-full bg-mocha/60"
                aria-hidden="true"
              />
              {t('tagline')}
              <span
                className="h-1.5 w-1.5 rounded-full bg-mocha/60"
                aria-hidden="true"
              />
            </span>

            <h1
              className="mt-10 max-w-4xl text-5xl font-semibold text-warm-dark sm:text-7xl"
              style={{ letterSpacing: '-1.5px', lineHeight: 1.08 }}
            >
              {t('title')}
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-taupe">
              {t('description')}
            </p>

            <div className="mt-10 flex flex-row items-center justify-center gap-3 sm:gap-4">
              <CalendlyButton />
              <SmoothScrollLink
                targetId="services"
                className="inline-flex cursor-pointer items-center rounded-lg border border-mocha/15 bg-surface-100 px-3 py-2.5 text-xs font-medium text-warm-dark transition-colors duration-150 hover:border-mocha/30 hover:text-mocha-dark sm:px-5 sm:py-3 sm:text-sm"
              >
                {t('viewServices')}
              </SmoothScrollLink>
            </div>
          </FadeIn>
        </Container>
      </section>

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

      {/* ───── Services ───── */}
      <section id="services" className="py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2
              className="text-4xl font-semibold text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('services.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('services.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {serviceCards.map(({ key, href, image }) => (
              <FadeIn key={key} className="flex">
                <Link href={href} className="flex w-full">
                  <article className="group relative flex w-full flex-col overflow-hidden rounded-xl border border-mocha/8 bg-white transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                    <div className="relative h-48 overflow-hidden sm:h-56">
                      <Image
                        src={image}
                        alt={`${key} services`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-8 sm:p-10">
                      <div>
                        <p className="text-xs font-semibold tracking-wider text-mocha uppercase">
                          {t(`services.categories.${key}.title`)}
                        </p>
                        <h3
                          className="mt-3 text-2xl font-semibold text-warm-dark"
                          style={{ letterSpacing: '-0.3px', lineHeight: 1.25 }}
                        >
                          {t(`services.categories.${key}.heading`)}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-taupe">
                          {t(`services.categories.${key}.description`)}
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

      {/* ───── Testimonial ───── */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <figure className="mx-auto max-w-3xl text-center">
              <svg
                className="mx-auto h-8 w-8 text-mocha/30"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="mt-8">
                <p className="text-xl leading-relaxed text-warm-dark italic sm:text-2xl">
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

      {/* ───── Comprehensive Services ───── */}
      <section className="border-t border-mocha/8 bg-surface-300 py-24">
        <Container>
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wider text-mocha uppercase">
              {t('services.comprehensive.eyebrow')}
            </p>
            <h2
              className="mt-4 text-4xl font-semibold text-warm-dark sm:text-5xl"
              style={{ letterSpacing: '-0.5px', lineHeight: 1.15 }}
            >
              {t('services.comprehensive.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe">
              {t('services.comprehensive.description')}
            </p>
          </FadeIn>

          <FadeInStagger className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {(['general', 'cosmetic', 'restorative', 'pediatric'] as const).map(
              (key) => (
                <FadeIn key={key}>
                  <div className="rounded-xl border border-mocha/8 bg-white p-8">
                    <h3 className="text-lg font-semibold text-warm-dark">
                      {t(`services.comprehensive.list.${key}.title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-taupe">
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
