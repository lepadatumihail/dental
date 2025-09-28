import imageHero from '@/images/clinic/dentists.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import {
  Clock,
  FirstAid,
  Phone,
  CalendarCheck,
  MapPin,
  Car,
  CreditCard,
  ShieldPlus,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/Button'
import { useTranslations } from 'next-intl'

import { Blockquote } from '@/components/Blockquote'

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'se' }]
}

export const metadata = {
  title: '24/7 Emergency Dental Care in Marbella | Prisma Clinic Marbella',
  description:
    'Immediate emergency dental care available 24/7 in Marbella. Same-day appointments for dental emergencies including severe pain, broken teeth, and trauma. Call our hotline now!',
  openGraph: {
    title: '24/7 Emergency Dental Care in Marbella | Prisma Clinic Marbella',
    description:
      'Immediate emergency dental care available 24/7 in Marbella. Same-day appointments for dental emergencies including severe pain, broken teeth, and trauma. Call our hotline now!',
    url: 'https://prismaclinicmarbella.es/services/emergency',
    siteName: 'Prisma Clinic Marbella',
    type: 'website',
  },
  alternates: {
    canonical: 'https://prismaclinicmarbella.es/services/emergency',
  },
}

export default function EmergencyDentalServices() {
  const t = useTranslations('emergencyPage')

  return (
    <div className="mx-auto max-w-7xl">
      <FadeIn>
        <div className="relative mx-1 mt-12 mb-20 h-[500px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24">
          <Image
            src={imageHero}
            alt={t('hero.title')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
            <div className="max-w-4xl px-12">
              <h1 className="mb-6 font-display text-4xl font-medium tracking-tight text-white sm:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="text-md text-white/90 md:text-xl">
                {t('hero.description')}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="tel:+34673290786" invert>
                  <div className="flex flex-row items-center gap-2">
                    <Phone size={20} />
                    <p>{t('hero.emergencyHotline')}</p>
                  </div>
                </Button>
                <Button
                  href="https://wa.me/+34673290786"
                  invert
                  className="border border-white bg-transparent hover:bg-white/10"
                >
                  <div className="flex flex-row items-center">
                    <Phone className="mr-2" size={20} />
                    <p>{t('hero.whatsapp')}</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <Container className="my-8">
        <FadeIn>
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="md:w-1/2">
              <div className="mb-4 flex items-center gap-3">
                <FirstAid size={32} />
                <h2 className="font-display text-2xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                  {t('services.title')}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-neutral-600">
                {t('services.description')}
              </p>
            </div>
            <div className="flex items-center justify-self-auto rounded-xl sm:justify-center sm:bg-neutral-100 sm:p-8">
              <StatList>
                <StatListItem
                  value={t('services.stats.availability.value')}
                  label={t('services.stats.availability.label')}
                />
                <StatListItem
                  value={t('services.stats.response.value')}
                  label={t('services.stats.response.label')}
                />
                <StatListItem
                  value={t('services.stats.treatment.value')}
                  label={t('services.stats.treatment.label')}
                />
                <StatListItem
                  value={t('services.stats.insurance.value')}
                  label={t('services.stats.insurance.label')}
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
                <ShieldPlus size={28} />
                <h3 className="font-display text-xl font-medium tracking-tight text-neutral-900 md:text-3xl">
                  {t('conditions.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('conditions.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('conditions.items.toothache.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('conditions.items.toothache.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('conditions.items.broken.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('conditions.items.broken.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('conditions.items.knockedOut.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('conditions.items.knockedOut.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('conditions.items.lostRestorations.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('conditions.items.lostRestorations.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('conditions.items.abscess.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('conditions.items.abscess.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('conditions.items.trauma.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('conditions.items.trauma.description')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="mb-6 flex items-center gap-3">
                <Clock size={32} className="text-neutral-900" />
                <h3 className="font-display text-xl font-medium tracking-tight text-neutral-900 md:text-3xl">
                  {t('whyChoose.title')}
                </h3>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-4 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <Clock size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('whyChoose.features.availability.title')}
                  </h4>
                  <p className="text-sm text-neutral-700">
                    {t('whyChoose.features.availability.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <CalendarCheck size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('whyChoose.features.sameDay.title')}
                  </h4>
                  <p className="text-sm text-neutral-700">
                    {t('whyChoose.features.sameDay.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <MapPin size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('whyChoose.features.location.title')}
                  </h4>
                  <p className="text-sm text-neutral-700">
                    {t('whyChoose.features.location.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <CreditCard size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('whyChoose.features.payment.title')}
                  </h4>
                  <p className="text-sm text-neutral-700">
                    {t('whyChoose.features.payment.description')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 p-10 shadow-inner">
            <FadeIn>
              <div className="mb-8 flex items-center gap-3">
                <h3 className="font-display text-xl font-medium tracking-tight text-neutral-900 md:text-3xl">
                  {t('howWorks.title')}
                </h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="relative">
                  <div className="absolute top-0 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                    <span className="text-lg font-semibold">1</span>
                  </div>
                  <div className="ml-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                      {t('howWorks.steps.call.title')}
                    </h4>
                    <p className="text-neutral-700">
                      {t('howWorks.steps.call.description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                    <span className="text-lg font-semibold">2</span>
                  </div>
                  <div className="ml-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                      {t('howWorks.steps.describe.title')}
                    </h4>
                    <p className="text-neutral-700">
                      {t('howWorks.steps.describe.description')}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                    <span className="text-lg font-semibold">3</span>
                  </div>
                  <div className="ml-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                      {t('howWorks.steps.come.title')}
                    </h4>
                    <p className="text-neutral-700">
                      {t('howWorks.steps.come.description')}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          <section className="my-14">
            <FadeIn>
              <Blockquote
                className="font-display"
                author={{ name: 'Maria Rodriguez', role: 'Emergency Patient' }}
                image={{
                  src: imageHero,
                  width: 300,
                  height: 400,
                  alt: 'Maria Rodriguez',
                }}
              >
                {t('testimonial.quote')}
              </Blockquote>
            </FadeIn>
          </section>

          <section className="my-8">
            <FadeIn>
              <div className="rounded-2xl bg-neutral-900 p-12 text-white">
                <h3 className="font-display text-xl font-medium tracking-tight md:text-3xl">
                  {t('callToAction.title')}
                </h3>
                <p className="mt-2 text-neutral-300">
                  {t('callToAction.description')}
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button href="tel:+34673290786" invert>
                    <div className="flex flex-row items-center gap-2">
                      <Phone size={20} />
                      <p>{t('callToAction.callNow')}</p>
                    </div>
                  </Button>
                  <Button
                    href="https://wa.me/+34673290786"
                    invert
                    className="border border-white bg-transparent hover:bg-white/10"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <Phone size={20} />
                      <p>{t('callToAction.whatsapp')}</p>
                    </div>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </section>
        </FadeInStagger>
      </Container>
    </div>
  )
}
