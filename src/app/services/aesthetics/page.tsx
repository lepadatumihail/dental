import logo from '@/images/svg/syringe.svg'
import imageHero from '@/images/clinic/aesthetics-2.jpg'
import { StatList, StatListItem } from '@/components/StatList'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import {
  Syringe,
  Smiley,
  ShieldStar,
  FirstAid,
  Stethoscope,
  User,
  Calendar,
  ClockCounterClockwise,
  Sparkle,
  Scissors,
  Leaf,
} from '@phosphor-icons/react/dist/ssr'
import CalendlyButton from '@/components/CalendlyButton'

export const caseStudy = {
  client: 'Aesthetics',
  title: 'Premium Aesthetic Treatments',
  description:
    'State-of-the-art aesthetic clinic offering comprehensive beauty and rejuvenation services including facial treatments, skin rejuvenation, and body contouring.',
  summary: [
    'Prisma Clinic Marbella provides exceptional aesthetic care combining cutting-edge technology with personalized treatment plans for optimal results.',
    'Our services include facial treatments, skin rejuvenation, body contouring, and specialized aesthetic procedures.',
  ],
  logo,
  image: { src: imageHero },
  date: '2025-01',
  service: 'Aesthetic Treatments, Beauty Services',
  testimonial: {
    author: { name: 'Debra Fiscal', role: 'Patient' },
    content:
      'The team at Prisma Clinic Marbella provided exceptional care during my aesthetic treatments. Their attention to detail and commitment to patient comfort made the entire experience outstanding.',
  },
}

export const metadata = {
  title: 'Prisma Clinic Marbella - Premium Aesthetic Services',
  description:
    'State-of-the-art aesthetic clinic offering comprehensive beauty and rejuvenation services including facial treatments, skin rejuvenation, and body contouring.',
}

export default function AestheticsServices() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-1 mt-12 mb-20 h-[500px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24">
        <Image
          src={imageHero}
          alt="Aesthetic Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
          <div className="max-w-2xl px-12">
            <h1 className="mb-6 font-display text-6xl font-medium tracking-tight text-white">
              Prisma Clinic Marbella Aesthetics
            </h1>
            <p className="text-xl font-light text-white/90">
              State-of-the-art aesthetic clinic offering comprehensive beauty
              and rejuvenation services for natural, stunning results.
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
                  Our Services
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-neutral-600">
                Our modern facilities and experienced aesthetic specialists
                ensure patients receive the highest quality care for all their
                beauty and rejuvenation needs. We pride ourselves on providing
                personalized treatment plans tailored to each patient&apos;s
                specific goals.
              </p>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-neutral-100 p-8">
              <StatList>
                <StatListItem value="100%" label="Patient satisfaction" />
                <StatListItem value="15+" label="Years of experience" />
                <StatListItem value="500+" label="Successful treatments" />
                <StatListItem value="20+" label="Treatment options" />
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
                  Facial Treatments
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Enhance your natural facial features with our premium
                treatments:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Lip Filler
                  </h4>
                  <p className="text-neutral-700">
                    Add volume and definition to your lips
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Facial Harmonization
                  </h4>
                  <p className="text-neutral-700">
                    Create balanced, harmonious facial proportions
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    5-Point Lift
                  </h4>
                  <p className="text-neutral-700">
                    Non-surgical facelift targeting key facial areas
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Under-Eye PDRN
                  </h4>
                  <p className="text-neutral-700">
                    Reduce dark circles and under-eye hollowing
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Eyelid Lift
                  </h4>
                  <p className="text-neutral-700">
                    Rejuvenate tired-looking eyes without surgery
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Nose Tip Lift
                  </h4>
                  <p className="text-neutral-700">
                    Refine and enhance your nose without surgery
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Leaf size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  Skin Rejuvenation
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Revitalize your skin with our advanced procedures:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Bio Revitalizer
                  </h4>
                  <p className="text-neutral-700">
                    Deep hydration and skin regeneration
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Skin Booster
                  </h4>
                  <p className="text-neutral-700">
                    Improve skin texture and luminosity
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Micro Needling
                  </h4>
                  <p className="text-neutral-700">
                    Stimulate collagen production for firmer skin
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Chemical Peel
                  </h4>
                  <p className="text-neutral-700">
                    Remove damaged outer layers for renewed skin
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Exosomes
                  </h4>
                  <p className="text-neutral-700">
                    Advanced cell therapy for skin rejuvenation
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    PRP Face/Capilar
                  </h4>
                  <p className="text-neutral-700">
                    Harness your body&apos;s healing capabilities for skin and
                    hair
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <Scissors size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  Body Contouring
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Sculpt and define your body contours:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Fat Dissolving
                  </h4>
                  <p className="text-neutral-700">
                    Non-surgical reduction of localized fat deposits
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14">
            <FadeIn>
              <div className="flex items-center gap-3">
                <FirstAid size={28} />
                <h3 className="font-display text-3xl font-medium tracking-tight text-neutral-900">
                  Specialized Treatments
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Targeted solutions for specific concerns:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Skin Tag Removal
                  </h4>
                  <p className="text-neutral-700">
                    Safe and effective removal of unwanted skin tags
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Botox Full Face
                  </h4>
                  <p className="text-neutral-700">
                    Reduce wrinkles and fine lines throughout the face
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Gummy Smile
                  </h4>
                  <p className="text-neutral-700">
                    Correct excessive gum exposure when smiling
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Lip Flip
                  </h4>
                  <p className="text-neutral-700">
                    Create the appearance of fuller lips without fillers
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Bruxism
                  </h4>
                  <p className="text-neutral-700">
                    Treat teeth grinding and jaw clenching
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Nefertiti Neck Lift
                  </h4>
                  <p className="text-neutral-700">
                    Redefine the jawline and neck contours
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Barbie Tox
                  </h4>
                  <p className="text-neutral-700">
                    Create a lifted, youthful appearance with precision
                    techniques
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
                  Highly qualified aesthetic specialists and medical
                  professionals
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Syringe size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Advanced Technology
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Latest aesthetic technology and premium products
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
                  Customized treatment plans for your unique aesthetic goals
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Smiley size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Natural Results
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Enhanced beauty that looks subtle and naturally beautiful
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
                  Flexible appointment times to fit your busy lifestyle
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                <div className="mb-2 flex items-center gap-2">
                  <ClockCounterClockwise size={20} />
                  <h4 className="font-display text-lg font-semibold text-neutral-900">
                    Minimal Downtime
                  </h4>
                </div>
                <p className="text-neutral-700">
                  Non-invasive treatments that let you return to daily
                  activities quickly
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
              premium aesthetic care at Prisma Clinic Marbella.
            </p>
          </div>
          <CalendlyButton />
        </FadeIn>
      </Container>
    </div>
  )
}
