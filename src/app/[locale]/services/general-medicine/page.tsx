import imageHero from '@/images/clinic/xray.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import {
  FirstAidKit,
  Smiley,
  ShieldStar,
  Stethoscope,
  User,
  Calendar,
  ClockCounterClockwise,
  Pulse,
  Activity,
  Syringe,
} from '@phosphor-icons/react/dist/ssr'
import CalendlyButton from '@/components/CalendlyButton'
import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'Prisma Clinic Marbella - General Practice & Primary Care Services',
  description:
    'State-of-the-art medical facility offering comprehensive general practitioner services from routine check-ups to chronic disease management, available 24/7 for emergencies.',
}

export default function GeneralMedicineServices() {
  const t = useTranslations('generalMedicine')

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-1 mt-12 mb-20 h-[500px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24">
        <Image
          src={imageHero}
          alt="General Medicine Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
          <div className="max-w-2xl px-12">
            <h1 className="mb-6 font-display text-3xl font-medium tracking-tight text-white sm:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="texl-md text-white/90 sm:text-xl">
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
                <FirstAidKit size={32} />
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
                <StatListItem value="100%" label="Patient satisfaction" />
                <StatListItem value="24/7" label="Emergency availability" />
                <StatListItem value="15+" label="Years of experience" />
                <StatListItem value="500+" label="Patients treated" />
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
                <Stethoscope size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('primaryCare.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('primaryCare.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('primaryCare.items.checkups.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('primaryCare.items.checkups.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('primaryCare.items.assessments.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('primaryCare.items.assessments.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('primaryCare.items.travel.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('primaryCare.items.travel.description')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Pulse size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('chronicDisease.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('chronicDisease.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('chronicDisease.items.diabetes.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('chronicDisease.items.diabetes.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('chronicDisease.items.hypertension.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('chronicDisease.items.hypertension.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('chronicDisease.items.asthma.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('chronicDisease.items.asthma.description')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Activity size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('specialized.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('specialized.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('specialized.items.surgical.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('specialized.items.surgical.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('specialized.items.mental.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('specialized.items.mental.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('specialized.items.gender.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('specialized.items.gender.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('specialized.items.bloodTests.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('specialized.items.bloodTests.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('specialized.items.ivDrips.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('specialized.items.ivDrips.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('specialized.items.cocktails.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('specialized.items.cocktails.description')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <ClockCounterClockwise size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  {t('preventive.title')}
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                {t('preventive.description')}
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('preventive.items.vaccination.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('preventive.items.vaccination.description')}
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    {t('preventive.items.screenings.title')}
                  </h4>
                  <p className="text-neutral-700">
                    {t('preventive.items.screenings.description')}
                  </p>
                </div>
              </FadeIn>
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
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <User size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {t('whyChoose.features.expert.title')}
                  </h4>
                </div>
                <p className="text-neutral-700">
                  {t('whyChoose.features.expert.description')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Syringe size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {t('whyChoose.features.facility.title')}
                  </h4>
                </div>
                <p className="text-neutral-700">
                  {t('whyChoose.features.facility.description')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Stethoscope size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {t('whyChoose.features.personalized.title')}
                  </h4>
                </div>
                <p className="text-neutral-700">
                  {t('whyChoose.features.personalized.description')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Smiley size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {t('whyChoose.features.comfort.title')}
                  </h4>
                </div>
                <p className="text-neutral-700">
                  {t('whyChoose.features.comfort.description')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {t('whyChoose.features.scheduling.title')}
                  </h4>
                </div>
                <p className="text-neutral-700">
                  {t('whyChoose.features.scheduling.description')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Syringe size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    {t('whyChoose.features.diagnostics.title')}
                  </h4>
                </div>
                <p className="text-neutral-700">
                  {t('whyChoose.features.diagnostics.description')}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </Container>

      <Container className="mb-20 text-center">
        <FadeIn>
          <div className="flex flex-col items-center gap-4">
            <p className="mb-8 max-w-5xl font-display text-2xl text-neutral-700">
              {t('cta.text')}
            </p>
          </div>
          <CalendlyButton />
        </FadeIn>
      </Container>
    </div>
  )
}
