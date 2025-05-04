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

import { Blockquote } from '@/components/Blockquote'

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
  return (
    <div className="mx-auto max-w-7xl">
      <FadeIn>
        <div className="relative mx-1 mt-12 mb-20 h-[500px] overflow-hidden rounded-2xl sm:mx-0 sm:mt-24">
          <Image
            src={imageHero}
            alt="24/7 Emergency Dental Care in Marbella"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-neutral-950/80 to-transparent">
            <div className="max-w-4xl px-12">
              <h1 className="mb-6 font-display text-4xl font-medium tracking-tight text-white sm:text-6xl">
                24/7 Emergency Dental Care
              </h1>
              <p className="text-md text-white/90 md:text-xl">
                Immediate dental attention when you need it most. Available 24
                hours a day, every day of the year in Marbella.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="tel:+34673290786" invert>
                  <div className="flex flex-row items-center gap-2">
                    <Phone size={20} />
                    <p>Emergency Hotline</p>
                  </div>
                </Button>
                <Button
                  href="https://wa.me/+34673290786"
                  invert
                  className="border border-white bg-transparent hover:bg-white/10"
                >
                  <div className="flex flex-row items-center">
                    <Phone className="mr-2" size={20} />
                    <p>WhatsApp</p>
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
                  Emergency Services
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-neutral-600">
                Dental emergencies can happen at any time. At Prisma Clinic
                Marbella, we provide immediate care for all dental emergencies,
                24 hours a day, 7 days a week. Our team of specialists is always
                ready to provide prompt treatment to relieve your pain and
                address urgent dental issues.
              </p>
            </div>
            <div className="flex items-center justify-self-auto rounded-xl sm:justify-center sm:bg-neutral-100 sm:p-8">
              <StatList>
                <StatListItem value="24/7" label="Always available" />
                <StatListItem value="15min" label="Response time" />
                <StatListItem value="100%" label="Same-day treatment" />
                <StatListItem value="All" label="Insurance accepted" />
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
                  Emergency Dental Conditions
                </h3>
              </div>
              <p className="text-md my-2 text-neutral-600">
                Our emergency dental care covers a wide range of urgent
                conditions:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Severe Toothache
                  </h4>
                  <p className="text-neutral-700">
                    Immediate pain relief and treatment for intense dental pain
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Broken or Chipped Teeth
                  </h4>
                  <p className="text-neutral-700">
                    Quick restoration of damaged teeth to prevent further
                    complications
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Knocked-Out Teeth
                  </h4>
                  <p className="text-neutral-700">
                    Emergency replantation and treatment for avulsed teeth
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Lost Crowns or Fillings
                  </h4>
                  <p className="text-neutral-700">
                    Immediate replacement of lost dental restorations
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Dental Abscess
                  </h4>
                  <p className="text-neutral-700">
                    Urgent treatment for painful dental bacteria and infections
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="rounded-xl border border-gray-300 bg-gray-50 p-6 shadow-md transition-all duration-200 hover:translate-y-[-2px] hover:shadow">
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Dental Trauma
                  </h4>
                  <p className="text-neutral-700">
                    Expert care for teeth and gum injuries from accidents
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
                  Why Choose Our Emergency Dental Service
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
                    Available 24/7
                  </h4>
                  <p className="text-sm text-neutral-700">
                    Our team is available around the clock, including weekends
                    and holidays
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <CalendarCheck size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Same-Day Treatment
                  </h4>
                  <p className="text-sm text-neutral-700">
                    Immediate appointments for all emergency cases
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <MapPin size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Central Marbella Location
                  </h4>
                  <p className="text-sm text-neutral-700">
                    Easily accessible clinic in the heart of Marbella
                  </p>
                </div>
              </FadeIn>
              <FadeIn>
                <div className="group flex h-full flex-col items-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-neutral-100 p-3 text-neutral-800 transition-all duration-300 group-hover:bg-neutral-200">
                    <CreditCard size={32} />
                  </div>
                  <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                    Multiple Payment Options
                  </h4>
                  <p className="text-sm text-neutral-700">
                    We accept all major insurance plans and offer flexible
                    payment solutions
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>

          <section className="my-14 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 p-10 shadow-inner">
            <FadeIn>
              <div className="mb-8 flex items-center gap-3">
                <h3 className="font-display text-xl font-medium tracking-tight text-neutral-900 md:text-3xl">
                  How Our Emergency Service Works
                </h3>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-3">
                <div className="relative">
                  <div className="absolute top-0 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                    <span className="text-lg font-semibold">1</span>
                  </div>
                  <div className="ml-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                      Call Our Hotline
                    </h4>
                    <p className="text-neutral-700">
                      Contact our 24/7 emergency line at +34 673 290 786 to
                      speak with our team
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                    <span className="text-lg font-semibold">2</span>
                  </div>
                  <div className="ml-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                      Describe Emergency
                    </h4>
                    <p className="text-neutral-700">
                      Our specialists will assess your situation and provide
                      immediate advice
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                    <span className="text-lg font-semibold">3</span>
                  </div>
                  <div className="ml-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h4 className="mb-3 font-display text-xl font-semibold text-neutral-900">
                      Come to Our Clinic
                    </h4>
                    <p className="text-neutral-700">
                      We&apos;ll prepare for your arrival and provide immediate
                      treatment upon your arrival
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
                I had a terrible toothache at 2 AM and did not know what to do.
                I called Prisma Clinic Marbella&apos;s emergency line, and they
                saw me right away. The pain was gone within an hour, and I
                received exceptional care. I am so grateful they are available
                24/7!
              </Blockquote>
            </FadeIn>
          </section>

          <section className="my-8">
            <FadeIn>
              <div className="rounded-2xl bg-neutral-900 p-12 text-white">
                <h3 className="font-display text-xl font-medium tracking-tight md:text-3xl">
                  Need Emergency Dental Care?
                </h3>
                <p className="mt-2 text-neutral-300">
                  Do not wait until it is too late. Contact our emergency dental
                  service in Marbella now.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button href="tel:+34673290786" invert>
                    <div className="flex flex-row items-center gap-2">
                      <Phone size={20} />
                      <p>Call Now: +34 673 290 786</p>
                    </div>
                  </Button>
                  <Button
                    href="https://wa.me/+34673290786"
                    invert
                    className="border border-white bg-transparent hover:bg-white/10"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <Phone size={20} />
                      <p>WhatsApp Us</p>
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
