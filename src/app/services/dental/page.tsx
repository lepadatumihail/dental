import logo from '@/images/svg/tooth.svg'
import imageHero from '@/images/clinic/implant.jpg'
import imageDebraFiscal from '@/images/clinic/robin-colour.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import { Blockquote } from '@/components/Blockquote'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

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

export const caseStudy = {
  client: 'Dental',
  title: 'Premium Dental Care for Your Perfect Smile',
  description:
    'State-of-the-art dental facility offering comprehensive dental services from routine care to advanced cosmetic and surgical procedures, available 24/7 for emergencies.',
  summary: [
    'Prisma Clinic Marbella provides exceptional dental care combining cutting-edge technology with personalized treatment plans for optimal oral health.',
    'Our services include smile design, Hollywood smile, teeth whitening, implants, dental surgery, emergency care, and more.',
  ],
  logo,
  image: { src: imageHero },
  date: '2025-01',
  service: 'Dental Care, Emergency Services',
  testimonial: {
    author: { name: 'Debra Fiscal', role: 'Patient' },
    content:
      'The team at Prisma Clinic Marbella provided exceptional care during my smile makeover. Their attention to detail and commitment to patient comfort made the entire experience outstanding.',
  },
}

export const metadata = {
  title: 'Prisma Clinic Marbella - Premium Dental Services',
  description:
    'State-of-the-art dental facility offering comprehensive dental services from routine care to advanced cosmetic and surgical procedures, available 24/7 for emergencies.',
}

export default function DentalServices() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-1 mt-12 mb-20 h-[500px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24">
        <Image
          src={imageHero}
          alt="Dental Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
          <div className="max-w-2xl px-12">
            <h1 className="mb-6 font-display text-6xl font-medium tracking-tight text-white">
              Prisma Clinic Marbella Dental Services
            </h1>
            <p className="text-xl font-light text-white/90">
              State-of-the-art dental facility offering comprehensive dental
              services from routine care to advanced cosmetic and surgical
              procedures.
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
                  Our Services
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-neutral-600">
                Our modern facilities and experienced team ensure patients
                receive the highest quality care for all their dental needs. We
                pride ourselves on providing personalized treatment plans
                tailored to each patient&apos;s specific requirements.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-neutral-100 p-8">
              <StatList>
                <StatListItem value="100%" label="Patient satisfaction" />
                <StatListItem value="24/7" label="Emergency availability" />
                <StatListItem value="15+" label="Years of experience" />
                <StatListItem value="500+" label="Successful treatments" />
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
                  Cosmetic Dentistry
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Transform your smile with our advanced cosmetic procedures:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Smile Design
                  </h4>
                  <p className="text-neutral-700">
                    Custom-designed smile makeovers tailored to your facial
                    features
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Hollywood Smile
                  </h4>
                  <p className="text-neutral-700">
                    Achieve that perfect celebrity smile through comprehensive
                    treatment
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Professional Teeth Whitening
                  </h4>
                  <p className="text-neutral-700">
                    Advanced whitening techniques for a brighter smile
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <ShieldStar size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  Restorative Procedures
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Restore both function and aesthetics with our restorative
                treatments:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Dental Implants
                  </h4>
                  <p className="text-neutral-700">
                    Permanent tooth replacement solutions
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Fillings
                  </h4>
                  <p className="text-neutral-700">
                    Tooth-colored restorations for damaged teeth
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Prosthetics
                  </h4>
                  <p className="text-neutral-700">
                    High-quality dentures and bridges
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Stethoscope size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  Surgical Services
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Expert surgical care with minimal discomfort:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Extractions
                  </h4>
                  <p className="text-neutral-700">
                    Simple and complex tooth removal procedures
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Sinus Lifts
                  </h4>
                  <p className="text-neutral-700">
                    Preparing the upper jaw for successful implant placement
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Dental Surgery
                  </h4>
                  <p className="text-neutral-700">
                    Specialized surgical interventions for various conditions
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
                Maintain your oral health with our preventive services:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Professional Cleaning
                  </h4>
                  <p className="text-neutral-700">
                    Thorough cleaning and plaque removal
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Brush Up Sessions
                  </h4>
                  <p className="text-neutral-700">
                    Learn proper oral hygiene techniques from our experts
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section>
            <FadeIn>
              <div className="flex items-center gap-3">
                <FirstAid size={28} className="text-red-500" />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  Emergency Care
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                We understand dental emergencies can happen anytime:
              </p>
              <div className="rounded-xl border border-gray-300 bg-red-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="flex items-center gap-3">
                  <Clock size={24} />
                  <h4 className="font-display text-xl font-semibold text-neutral-900">
                    24-Hour Emergency Services
                  </h4>
                </div>
                <p className="mt-2 pl-9 text-neutral-700">
                  Immediate care for dental pain and trauma
                </p>
              </div>
            </FadeIn>
          </section>
        </FadeInStagger>
      </Container>

      <Container className="my-20">
        <FadeIn>
          <Blockquote
            author={{ name: 'Debra Fiscal', role: 'Patient' }}
            image={{ src: imageDebraFiscal }}
          >
            The team at Prisma Clinic Marbella provided exceptional care during
            my smile makeover. Their attention to detail and commitment to
            patient comfort made the entire experience outstanding.
          </Blockquote>
        </FadeIn>
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
                  Highly qualified dentists with specialized training
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Tooth size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    State-of-the-Art Facility
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Latest dental technology and equipment
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
                  Relaxing atmosphere to ease dental anxiety
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
            </div>
          </section>
        </FadeIn>
      </Container>

      <Container className="mb-20 text-center">
        <FadeIn>
          <p className="mb-8 font-display text-2xl text-neutral-700">
            Contact us today to schedule your consultation and experience
            premium dental care at Prisma Clinic Marbella.
          </p>

          <CalendlyButton />
        </FadeIn>
      </Container>
    </div>
  )
}
