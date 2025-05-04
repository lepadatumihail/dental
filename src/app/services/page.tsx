import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoMailSmirk from '@/images/clients/phobia/logo-dark.svg'
import { EmergencyServiceBanner } from '@/components/EmergencyServiceBanner'

import { FirstAidKit, Syringe, Tooth } from '@phosphor-icons/react/dist/ssr'
function Services() {
  const services = [
    {
      id: 1,
      icon: Tooth,
      client: 'Dental Care',
      service: 'Comprehensive Services',

      title: 'Premium Dental Services',
      summary: [
        'Our dental department offers a complete range of services including general dentistry, cosmetic treatments, implants, orthodontics, and emergency dental care available 24/7.',
        'Using state-of-the-art technology and the latest techniques, our experienced dentists provide personalized treatment plans to maintain and enhance your oral health and smile aesthetics.',
      ],
      href: '/services/dental',
      testimonial: {
        author: { name: 'Maria L.', role: 'Patient from Marbella' },
        content:
          'The dental care at Prisma Clinic is exceptional. From regular check-ups to my recent cosmetic procedure, the team has always provided professional and comfortable treatment.',
      },
    },
    {
      id: 2,
      icon: Syringe,
      client: 'Aesthetics',
      service: 'Beauty & Rejuvenation',

      title: 'Advanced Aesthetic Treatments',
      summary: [
        'Our aesthetics department specializes in non-surgical rejuvenation treatments including Botox, dermal fillers, lip enhancement, and other facial aesthetic procedures.',
        'Our qualified specialists create natural-looking results that enhance your features while maintaining facial harmony, helping you achieve a refreshed, youthful appearance.',
      ],
      href: '/services/aesthetics',
      testimonial: {
        author: { name: 'Sofia R.', role: 'Patient from Marbella' },
        content:
          "The aesthetic treatments at Prisma Clinic delivered exactly what I wanted - subtle enhancement that looks completely natural. The team's expertise and attention to detail is outstanding.",
      },
    },
    {
      id: 3,
      icon: FirstAidKit,
      client: 'General Practitioner',
      service: 'Primary Healthcare',

      title: 'Comprehensive Medical Care',
      summary: [
        'Our general practitioner services provide holistic primary healthcare including preventative medicine, chronic disease management, diagnostic services, and treatment for acute conditions.',
        'Our experienced doctors take the time to understand your health concerns and provide personalized care that addresses your specific needs, ensuring your overall wellbeing.',
      ],
      href: '/services/general-medicine',
      testimonial: {
        author: { name: 'Robert P.', role: 'Patient from Marbella' },
        content:
          'Having access to reliable primary care at Prisma Clinic has made managing my health so much easier. The personal attention and comprehensive approach is exactly what I needed.',
      },
    },
  ]

  return (
    <Container className="mt-24">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Services
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24">
        {services.map((service) => (
          <FadeIn key={service.id}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-10">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <service.icon size={42} />
                    <h3 className="mt-6 font-display text-2xl font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                      {service.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {service.service}
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={service.href}>{service.title}</Link>
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {service.summary.map((paragraph, index) => (
                      <p key={`${service.id}-paragraph-${index}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={service.href}
                      aria-label={`Learn more about ${service.client}`}
                    >
                      Learn more
                    </Button>
                  </div>
                  {service.testimonial && (
                    <Blockquote
                      author={service.testimonial.author}
                      className="mt-12"
                    >
                      {service.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Our Services | Prisma Clinic Marbella',
  description:
    'Medical and dental services in Marbella including emergency 24/7 dental care, cosmetic dentistry, and aesthetic treatments.',
}

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our Services"
        title="Comprehensive healthcare solutions in Marbella"
      >
        <p>
          Prisma Clinic Marbella provides a wide range of premium medical and
          dental services, including emergency care available 24/7. Our team of
          specialists is dedicated to providing exceptional care using
          cutting-edge technology.
        </p>
      </PageIntro>

      <EmergencyServiceBanner />

      <Services />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Bright Smiles', logo: logoMailSmirk }}
      >
        The team at Prisma Clinic Marbella transformed my dental experience.
        Their professional approach and state-of-the-art technology made my
        treatment comfortable and effective. I couldn&apos;t be happier with the
        results.
      </Testimonial>

      {/* <Clients />  */}

      {/* <ContactSection /> */}
    </>
  )
}
