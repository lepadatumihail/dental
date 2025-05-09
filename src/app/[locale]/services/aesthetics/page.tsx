import logo from '@/images/svg/syringe.svg'
import imageHero from '@/images/clinic/aesthetics-2.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { useTranslations } from 'next-intl'
import {
  Syringe,
  Sparkle,
  Scissors,
  Leaf,
} from '@phosphor-icons/react/dist/ssr'
import CalendlyButton from '@/components/CalendlyButton'

export const metadata = {
  title: 'Prisma Clinic Marbella - Premium Aesthetic Services',
  description:
    'State-of-the-art aesthetic clinic offering comprehensive beauty and rejuvenation services including facial treatments, skin rejuvenation, and body contouring.',
}

export default function AestheticsServices() {
  const t = useTranslations('layout.services.aesthetics')

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-1 mt-12 mb-20 h-[500px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24">
        <Image
          src={imageHero}
          alt={t('hero.imageAlt')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
          <div className="max-w-2xl px-12">
            <h1 className="mb-6 font-display text-6xl font-medium tracking-tight text-white">
              {t('hero.title')}
            </h1>
            <p className="text-xl font-light text-white/90">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </div>

      <Container className="my-8">
        <FadeIn>
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="md:w-1/2">
              <div className="mb-4 flex items-center gap-3">
                <Syringe size={32} />
                <h2 className="font-display text-4xl font-medium tracking-tight text-neutral-900">
                  {t('services.title')}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-neutral-600">
                {t('services.description')}
              </p>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-neutral-100 p-8">
              <StatList>
                <StatListItem
                  value={t('stats.satisfaction.value')}
                  label={t('stats.satisfaction.label')}
                />
                <StatListItem
                  value={t('stats.experience.value')}
                  label={t('stats.experience.label')}
                />
                <StatListItem
                  value={t('stats.treatments.value')}
                  label={t('stats.treatments.label')}
                />
                <StatListItem
                  value={t('stats.options.value')}
                  label={t('stats.options.label')}
                />
              </StatList>
            </div>
          </div>
        </FadeIn>
      </Container>

      <Container className="my-20">
        <FadeInStagger>
          <section>
            <FadeIn>
              <div className="flex items-center gap-3">
                <Sparkle size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('facial.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('facial.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {t
                .raw('facial.treatments')
                .map(
                  (
                    treatment: { title: string; description: string },
                    index: number,
                  ) => (
                    <FadeIn key={index}>
                      <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                        <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                          {treatment.title}
                        </h4>
                        <p className="text-neutral-700">
                          {treatment.description}
                        </p>
                      </div>
                    </FadeIn>
                  ),
                )}
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Leaf size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('skin.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('skin.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {t
                .raw('skin.treatments')
                .map(
                  (
                    treatment: { title: string; description: string },
                    index: number,
                  ) => (
                    <FadeIn key={index}>
                      <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                        <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                          {treatment.title}
                        </h4>
                        <p className="text-neutral-700">
                          {treatment.description}
                        </p>
                      </div>
                    </FadeIn>
                  ),
                )}
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Scissors size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('body.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('body.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {t
                .raw('body.treatments')
                .map(
                  (
                    treatment: { title: string; description: string },
                    index: number,
                  ) => (
                    <FadeIn key={index}>
                      <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                        <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                          {treatment.title}
                        </h4>
                        <p className="text-neutral-700">
                          {treatment.description}
                        </p>
                      </div>
                    </FadeIn>
                  ),
                )}
            </div>
          </section>
        </FadeInStagger>
      </Container>

      <Container className="my-20">
        <FadeIn>
          <div className="rounded-2xl bg-neutral-950 px-6 py-24 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white">
                {t('cta.title')}
              </h2>
              <p className="mt-4 text-lg text-neutral-300">
                {t('cta.description')}
              </p>
              <div className="mt-8">
                <CalendlyButton />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
