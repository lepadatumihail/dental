import imageHero from '@/images/clinic/aesthetics-1.jpg'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { getTranslations } from 'next-intl/server'
import { createCanonicalMetadata } from '@/lib/canonical'
import type { Metadata } from 'next'
import { ContactSection } from '@/components/ContactSection'
import CalendlyButton from '@/components/CalendlyButton'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import BozanaKrivosija from '@/images/bozana.jpeg'

// Generate static params for all locales
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
    title: 'Prisma Clinic Marbella - Premium Aesthetic Services',
    description:
      'State-of-the-art aesthetic clinic offering comprehensive beauty and rejuvenation services including facial harmonization, Botox treatments, anti-aging therapies, and body contouring in Marbella.',
    ...createCanonicalMetadata('services/aesthetics', locale),
  }
}

export default async function AestheticsServices({ params }: PageProps) {
  const t = await getTranslations('layout.services.aesthetics')

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <div className="relative mx-1 mt-2 mb-12 h-[400px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24 md:h-[400px]">
        <Image
          src={imageHero}
          alt="Aesthetics Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
          <div className="max-w-4xl px-12">
            <h1 className="mb-6 font-display text-3xl font-medium tracking-tight text-white sm:text-6xl">
              {t('hero.headline')}
            </h1>
            <p className="mb-8 text-sm text-white/80 sm:text-xl">
              {t('hero.description')}
            </p>
            <CalendlyButton />
          </div>
        </div>
      </div>

      {/* Subtle Divider */}
      <Container className="my-12">
        <div className="border-t border-neutral-200"></div>
      </Container>

      <Container className="my-10 sm:my-20">
        <FadeInStagger>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-900">
                    {t('category1.headline')}
                  </h2>
                </div>
                <p className="mb-8 text-sm leading-relaxed text-neutral-500 sm:text-lg">
                  {t('category1.description')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <CalendlyButton />
                </div>
              </div>
            </FadeIn>
            <div className="flex flex-col gap-6">
              {t
                .raw('category1.features')
                .map(
                  (
                    feature: { title: string; description: string },
                    index: number,
                  ) => (
                    <FadeIn key={index}>
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <h3 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-700">
                          {feature.description}
                        </p>
                      </div>
                    </FadeIn>
                  ),
                )}
            </div>
          </div>
        </FadeInStagger>
      </Container>

      {/* Subtle Divider */}
      <Container className="my-12">
        <div className="border-t border-neutral-200"></div>
      </Container>

      {/* Category 2 Section */}
      <Container id="category2" className="mb-24">
        <FadeInStagger>
          <div className="flex flex-col-reverse gap-12 md:flex-row">
            <div className="flex min-w-1/2 flex-col gap-6">
              {t
                .raw('category2.features')
                .map(
                  (
                    feature: { title: string; description: string },
                    index: number,
                  ) => (
                    <FadeIn key={index}>
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <h3 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-700">
                          {feature.description}
                        </p>
                      </div>
                    </FadeIn>
                  ),
                )}
            </div>
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center justify-end gap-3">
                  <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-900">
                    {t('category2.headline')}
                  </h2>
                </div>
                <p className="mb-8 text-end text-sm leading-relaxed text-neutral-600 sm:text-lg">
                  {t('category2.description')}
                </p>
                <div className="flex w-full justify-end gap-4">
                  <CalendlyButton />
                </div>
              </div>
            </FadeIn>
          </div>
        </FadeInStagger>
      </Container>

      {/* Subtle Divider */}
      <Container className="my-12">
        <div className="border-t border-neutral-200"></div>
      </Container>

      {/* Category 3 Section */}
      <Container id="category3" className="mb-24">
        <FadeInStagger>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-900">
                    {t('category3.headline')}
                  </h2>
                </div>
                <p className="mb-8 text-sm leading-relaxed text-neutral-600 sm:text-lg">
                  {t('category3.description')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <CalendlyButton />
                </div>
              </div>
            </FadeIn>
            <div className="flex flex-col gap-6">
              {t
                .raw('category3.features')
                .map(
                  (
                    feature: { title: string; description: string },
                    index: number,
                  ) => (
                    <FadeIn key={index}>
                      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                        <h3 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-700">
                          {feature.description}
                        </p>
                      </div>
                    </FadeIn>
                  ),
                )}
            </div>
          </div>
        </FadeInStagger>
      </Container>

      {/* Meet Our Doctor Section */}
      <Container className="mb-24">
        <FadeIn>
          <h2 className="my-8 text-center font-display text-4xl font-medium tracking-tight text-neutral-900">
            {t('doctor.title')}
          </h2>

          {/* Centered Title */}
          {/* Image and Text Grid */}
          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative min-h-96 w-full overflow-hidden rounded-lg md:min-h-[550px]">
              <Image
                src={BozanaKrivosija}
                alt="Dr. Bozana Krivošija"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="mb-4 font-display text-3xl font-medium tracking-tight text-neutral-900">
                Dr. Bozana Krivošija
              </h2>
              <p className="text-md mb-8 leading-relaxed text-neutral-600">
                {t('doctor.bio')}
              </p>
              <CalendlyButton />
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Treatments Grid Section */}
      <Container id="treatments" className="mb-24">
        <FadeInStagger>
          <FadeIn>
            <div className="mb-12 flex items-center justify-center gap-3">
              <h2 className="text-center font-display text-4xl font-medium tracking-tight text-neutral-900">
                {t('treatments.title')}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t
              .raw('treatments.items')
              .map(
                (
                  treatment: { title: string; description: string },
                  index: number,
                ) => (
                  <FadeIn key={index}>
                    <div className="h-full rounded-xl border border-neutral-200 bg-neutral-50 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                      <h3 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                        {treatment.title}
                      </h3>
                      <p className="text-sm text-neutral-700">
                        {treatment.description}
                      </p>
                    </div>
                  </FadeIn>
                ),
              )}
          </div>
        </FadeInStagger>
      </Container>

      {/* Subtle Divider */}
      <Container className="my-12">
        <div className="border-t border-neutral-200"></div>
      </Container>

      {/* Testimonials Section */}
      <Container className="mb-24">
        <FadeInStagger>
          <FadeIn>
            <div className="mb-12 flex items-center justify-center gap-3">
              <h2 className="text-center font-display text-4xl font-medium tracking-tight text-neutral-900">
                {t('testimonials.title')}
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.raw('testimonials.items').map(
              (
                testimonial: {
                  content: string
                  author: string
                  role: string
                },
                index: number,
              ) => {
                const images = [
                  imageEmmaDorsey,
                  imageChelseaHagon,
                  imageKathrynMurphy,
                  imageWhitneyFrancis,
                ]
                return (
                  <FadeIn key={index}>
                    <div className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={images[index]}
                            alt={testimonial.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <p className="flex-grow text-sm text-neutral-700">
                        {testimonial.content}
                      </p>
                    </div>
                  </FadeIn>
                )
              },
            )}
          </div>
        </FadeInStagger>
      </Container>

      {/* Contact Section */}
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  )
}
