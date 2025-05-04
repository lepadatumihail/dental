import logo from '@/images/svg/first-aid.svg'
import imageHero from '@/images/clinic/clinic1.jpg'
import imageDebraFiscal from '@/images/clinic/robin-colour.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import { Blockquote } from '@/components/Blockquote'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import {
  FirstAidKit,
  Smiley,
  ShieldStar,
  Clock,
  FirstAid,
  Stethoscope,
  User,
  Calendar,
  ClockCounterClockwise,
  Pulse,
  Activity,
  Syringe,
} from '@phosphor-icons/react/dist/ssr'
import CalendlyButton from '@/components/CalendlyButton'
import { Footer } from '@/components/Footer'

export const caseStudy = {
  client: 'General Medicine',
  title: 'Comprehensive Primary Care Services',
  description:
    'State-of-the-art medical facility offering comprehensive general practitioner services from routine check-ups to chronic disease management, available 24/7 for emergencies.',
  summary: [
    'Prisma Clinic Marbella provides exceptional primary care combining leading medical expertise with personalized treatment plans for optimal health outcomes.',
    'Our services include routine check-ups, chronic disease management, preventive care, minor surgical procedures, diagnostics, and more.',
  ],
  logo,
  image: { src: imageHero },
  date: '2025-01',
  service: 'General Practice, Primary Care, Emergency Services',
  testimonial: {
    author: { name: 'Debra Fiscal', role: 'Patient' },
    content:
      'The team at Prisma Clinic Marbella provided exceptional care during my health journey. Their attention to detail and commitment to patient well-being made the entire experience outstanding.',
  },
}

export const metadata = {
  title: 'Prisma Clinic Marbella - General Practice & Primary Care Services',
  description:
    'State-of-the-art medical facility offering comprehensive general practitioner services from routine check-ups to chronic disease management, available 24/7 for emergencies.',
}

export default function GeneralMedicineServices() {
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
            <h1 className="mb-6 font-display text-6xl font-medium tracking-tight text-white">
              Prisma Clinic Marbella General Medicine
            </h1>
            <p className="text-xl font-light text-white/90">
              State-of-the-art medical facility offering comprehensive primary
              care services from routine check-ups to chronic disease
              management.
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
                  Our Services
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-neutral-600">
                Our modern facilities and experienced medical team ensure
                patients receive the highest quality care for all their health
                needs. We pride ourselves on providing personalized treatment
                plans tailored to each patient&apos;s specific requirements.
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
                  Primary Care
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Comprehensive healthcare for you and your family:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Routine Check-ups
                  </h4>
                  <p className="text-neutral-700">
                    Comprehensive physical examinations to monitor your overall
                    health
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Health Assessments
                  </h4>
                  <p className="text-neutral-700">
                    Thorough evaluations of your current health status and risk
                    factors
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Travel Medicine
                  </h4>
                  <p className="text-neutral-700">
                    Pre-travel consultations, vaccinations, and health advice
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
                  Chronic Disease Management
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Expert care for ongoing health conditions:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Diabetes Care
                  </h4>
                  <p className="text-neutral-700">
                    Comprehensive management of all types of diabetes
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Hypertension Control
                  </h4>
                  <p className="text-neutral-700">
                    Monitoring and management of high blood pressure
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Asthma & COPD
                  </h4>
                  <p className="text-neutral-700">
                    Respiratory condition management and treatment plans
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
                  Specialized Services
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Additional care for specific health concerns:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Minor Surgical Procedures
                  </h4>
                  <p className="text-neutral-700">
                    In-office procedures including mole removal and skin
                    biopsies
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Mental Health Support
                  </h4>
                  <p className="text-neutral-700">
                    Assessment and management of anxiety, depression, and stress
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Women&apos;s & Men&apos;s Health
                  </h4>
                  <p className="text-neutral-700">
                    Gender-specific health screenings and consultations
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
                  Preventive Care
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Maintain your health with our preventive services:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Vaccination
                  </h4>
                  <p className="text-neutral-700">
                    Full range of immunizations for all age groups
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Health Screenings
                  </h4>
                  <p className="text-neutral-700">
                    Early detection tests for various conditions
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
                Why Choose Prisma Clinic Marbella?
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <User size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Expert Team
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Highly qualified doctors and healthcare professionals
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Syringe size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    State-of-the-Art Facility
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Latest medical technology and equipment
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Stethoscope size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Personalized Care
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Customized treatment plans for each patient
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Smiley size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Comfortable Environment
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Relaxing atmosphere to ease medical anxiety
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Convenient Scheduling
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Flexible appointment times to fit your schedule
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Syringe size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    On-site Diagnostics
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Blood tests and basic diagnostic procedures available
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
              Contact us today to schedule your consultation and experience
              premium healthcare at Prisma Clinic Marbella.
            </p>
          </div>
          <CalendlyButton />
        </FadeIn>
      </Container>
    </div>
  )
}
