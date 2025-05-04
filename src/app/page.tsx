import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import SmoothScrollLink from '@/components/SmoothScrollLink'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import logoNeos from '@/images/clients/neos.png'
import logoStrauman from '@/images/clients/strauman.svg'
import logoInvisalign from '@/images/clients/invisalign.svg'
import { loadCaseStudies } from '@/lib/mdx'
import CalendlyButton from '@/components/CalendlyButton'
import Implants from '@/images/clinic/implant.jpg'
import Dentists from '@/images/clinic/dentists.jpg'
import { FirstAid, Syringe, Tooth } from '@phosphor-icons/react/dist/ssr'

const clients = [
  ['Invisalign', logoInvisalign],
  ['Neos', logoNeos],
  ['Strauman', logoStrauman],
  ['Unseal', logoUnseal],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-900 py-20 sm:mx-10 lg:mt-42">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Using the latest technology
          </h2>
          <div className="h-px flex-auto bg-neutral-700" />
        </FadeIn>
        <FadeInStagger faster>
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image
                    src={logo}
                    alt={client}
                    unoptimized
                    className={logo.src.includes('neos') ? 'max-w-20' : ''}
                  />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function ServiceCategory() {
  return (
    <div id="services">
      <SectionIntro title="Our Services" className="pt-24">
        <p className="sm:text-md font-display text-sm text-neutral-500">
          We utilize cutting-edge dental and aesthetic technologies to deliver
          premium care. Our advanced equipment ensures precision and comfort,
          enhancing both your smile and facial appearance with exceptional
          results.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <FadeIn className="flex">
            <article className="relative flex w-full flex-col rounded-3xl border border-white/20 bg-white/40 p-6 shadow-lg ring-1 ring-neutral-950/5 backdrop-blur-md backdrop-saturate-150 transition hover:bg-white/50 hover:shadow-xl sm:p-8">
              <h3>
                <Link href="/services/general-medicine">
                  <span className="absolute inset-0 rounded-3xl" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100/80 to-neutral-200/80 shadow-inner backdrop-blur-sm">
                    <FirstAid size={32} />
                  </div>
                </Link>
              </h3>
              <p className="mt-6 flex gap-x-2 text-sm font-medium text-neutral-950">
                General Practitioner
              </p>
              <p className="mt-6 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text font-display text-2xl font-semibold text-neutral-950 text-transparent">
                Comprehensive General Practitioner Services
              </p>
              <p className="mt-4 text-base text-neutral-600">
                High-quality primary healthcare services providing personalized
                care for patients of all ages, from routine check-ups to chronic
                disease management and preventive medicine.
              </p>
            </article>
          </FadeIn>

          <FadeIn className="flex">
            <article className="relative flex w-full flex-col rounded-3xl border border-white/20 bg-white/40 p-6 shadow-lg ring-1 ring-neutral-950/5 backdrop-blur-md backdrop-saturate-150 transition hover:bg-white/50 hover:shadow-xl sm:p-8">
              <h3>
                <Link href="/services/dental">
                  <span className="absolute inset-0 rounded-3xl" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100/80 to-neutral-200/80 shadow-inner backdrop-blur-sm">
                    <Tooth size={32} />
                  </div>
                </Link>
              </h3>
              <p className="mt-6 flex gap-x-2 text-sm font-medium text-neutral-950">
                Dental
              </p>
              <p className="mt-6 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text font-display text-2xl font-semibold text-neutral-950 text-transparent">
                Premium Dental Care for Your Perfect Smile
              </p>
              <p className="mt-4 text-base text-neutral-600">
                State-of-the-art dental facility offering comprehensive dental
                services from routine care to advanced cosmetic and surgical
                procedures, available 24/7 for emergencies.
              </p>
            </article>
          </FadeIn>

          <FadeIn className="flex">
            <article className="relative flex w-full flex-col rounded-3xl border border-white/20 bg-white/40 p-6 shadow-lg ring-1 ring-neutral-950/5 backdrop-blur-md backdrop-saturate-150 transition hover:bg-white/50 hover:shadow-xl sm:p-8">
              <h3>
                <Link href="/services/aesthetics">
                  <span className="absolute inset-0 rounded-3xl" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neutral-100/80 to-neutral-200/80 shadow-inner backdrop-blur-sm">
                    <Syringe size={32} />
                  </div>
                </Link>
              </h3>
              <p className="mt-6 flex gap-x-2 text-sm font-medium text-neutral-950">
                Aesthetics
              </p>
              <p className="mt-6 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text font-display text-2xl font-semibold text-neutral-950 text-transparent">
                Advanced Aesthetics Treatments
              </p>
              <p className="mt-4 text-base text-neutral-600">
                Prisma Clinic Marbella offers premium aesthetic treatments with
                cutting-edge technology and techniques to help you look and feel
                your best.
              </p>
            </article>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Our Services"
        title="Comprehensive Dental Care for the Whole Family"
        className="mt-24 font-display sm:mt-32"
      >
        <p className="sm:text-md text-sm text-neutral-600">
          At Prisma Clinic Marbella, we offer a wide range of services to meet
          all your dental needs. From preventive care to cosmetic dentistry, our
          experienced team is committed to providing personalized treatment in a
          comfortable and welcoming environment.
        </p>
      </SectionIntro>
      <Container className="mt-16 font-display">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={Dentists}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
                shape={0}
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="General Dentistry">
              Comprehensive check-ups, cleanings, fillings, and preventive care
              to maintain your oral health and prevent future problems.
            </ListItem>
            <ListItem title="Cosmetic Dentistry">
              Transform your smile with our range of cosmetic services including
              teeth whitening, veneers, bonding, and smile makeovers.
            </ListItem>
            <ListItem title="Restorative Dentistry">
              Restore damaged or missing teeth with crowns, bridges, implants,
              and dentures to regain full function and confidence.
            </ListItem>
            <ListItem title="Pediatric Dental Care">
              Specialized gentle care for children, creating positive dental
              experiences and establishing good oral health habits from an early
              age.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'Prisma Clinic Marbella offers comprehensive dental care with a focus on patient comfort and beautiful results.',
}

export default async function Home() {
  const caseStudies = (await loadCaseStudies()).slice(0, 3)

  return (
    <>
      <Container className="mt-16 font-display">
        <div className="flex flex-col gap-[140px] lg:flex-row">
          <div className="mt-32">
            <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-6xl">
              Prisma Clinic Marbella
            </h1>
            <p className="mt-6 text-lg text-neutral-500">
              At Prisma Clinic Marbella, we provide exceptional dental and
              aesthetics care with compassion and precision. Our team of
              experienced professionals uses advanced technology to ensure your
              comfort while delivering comprehensive treatments for all your
              oral health needs. From routine cleanings to cosmetic procedures,
              we are committed to giving you a healthy, beautiful smile.
            </p>

            <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row">
              <CalendlyButton />
              <SmoothScrollLink
                targetId="services"
                className="cursor-pointer rounded-md border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none"
              >
                View our services
              </SmoothScrollLink>
            </div>
          </div>
          <div className="flex justify-center lg:w-1/3">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[38rem]">
              <StylizedImage
                src={Implants}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
                shape={0}
              />
            </FadeIn>
          </div>
        </div>
      </Container>

      <Clients />

      <ServiceCategory />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Bright Smiles', logo: logoPhobiaDark }}
      >
        The team at Prisma Clinic Marbella made my dental visit so comfortable
        and stress-free. Their gentle approach and attention to detail
        completely changed my perspective on dental care.
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
