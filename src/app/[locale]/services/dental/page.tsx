import logo from '@/images/svg/tooth.svg'
import imageHero from '@/images/clinic/implant.jpg'
import imageDebraFiscal from '@/images/clinic/robin-colour.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import { Blockquote } from '@/components/Blockquote'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { useTranslations } from 'next-intl'

import {
  Tooth,
  Smiley,
  ShieldStar,
  Clock,
  FirstAid,
  Stethoscope,
  User,
  Calendar,
  ClockCounterClockwise,
  FirstAidKit,
} from '@phosphor-icons/react/dist/ssr'
import CalendlyButton from '@/components/CalendlyButton'
import { Footer } from '@/components/Footer'

type Treatment = {
  title: string
  description: string
}

type Feature = {
  title: string
  description: string
}

export const metadata = {
  title: 'Prisma Clinic Marbella - Premium Dental Services',
  description:
    'State-of-the-art dental facility offering comprehensive dental services from routine care to advanced cosmetic and surgical procedures, available 24/7 for emergencies.',
}

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export default function DentalServices() {
  const t = useTranslations('dental')

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
                <Tooth size={32} />
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
                  value={t('stats.availability.value')}
                  label={t('stats.availability.label')}
                />
                <StatListItem
                  value={t('stats.experience.value')}
                  label={t('stats.experience.label')}
                />
                <StatListItem
                  value={t('stats.treatments.value')}
                  label={t('stats.treatments.label')}
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
                <FirstAidKit size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('cosmetic.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('cosmetic.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t.raw('cosmetic.treatments') as Treatment[]).map(
                (treatment, index) => (
                  <FadeIn key={`cosmetic-${treatment.title}`}>
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
                <ShieldStar size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('restorative.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('restorative.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t.raw('restorative.treatments') as Treatment[]).map(
                (treatment, index) => (
                  <FadeIn key={`restorative-${treatment.title}`}>
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
                <Stethoscope size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('surgical.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('surgical.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t.raw('surgical.treatments') as Treatment[]).map(
                (treatment, index) => (
                  <FadeIn key={`surgical-${treatment.title}`}>
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
                <Clock size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('emergency.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('emergency.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(t.raw('emergency.conditions') as Treatment[]).map(
                (condition, index) => (
                  <FadeIn key={`emergency-${condition.title}`}>
                    <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                      <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                        {condition.title}
                      </h4>
                      <p className="text-neutral-700">
                        {condition.description}
                      </p>
                    </div>
                  </FadeIn>
                ),
              )}
            </div>
          </section>
        </FadeInStagger>
      </Container>

      <Container className="mb-20">
        <FadeIn>
          <section className="rounded-2xl bg-neutral-100 p-10">
            <div className="mb-8 flex items-center gap-3">
              <ShieldStar size={28} />
              <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                {t('whyChoose.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(
                t.raw('whyChoose.features') as Record<string, Feature>,
              ).map(([key, feature]) => (
                <div
                  key={`feature-${key}`}
                  className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <User size={20} />
                    <h4 className="font-display text-lg font-semibold text-neutral-900">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-neutral-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </Container>

      <Container className="mb-20">
        <FadeIn>
          <div className="text-center">
            <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600">
              {t('cta.description')}
            </p>
            <div className="mt-8">
              <CalendlyButton />
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  )
}
