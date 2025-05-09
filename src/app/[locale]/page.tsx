import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

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
import logoNeos from '@/images/clients/neoss.svg'
import logoStrauman from '@/images/clients/strauman.svg'
import logoInvisalign from '@/images/clients/invisalign.svg'
import { loadCaseStudies } from '@/lib/mdx'
import CalendlyButton from '@/components/CalendlyButton'
import Implants from '@/images/clinic/implant.jpg'
import Dentists from '@/images/clinic/xray.jpg'
import { FirstAid, Syringe, Tooth } from '@phosphor-icons/react/dist/ssr'

const clients = [
  ['Invisalign', logoInvisalign],
  ['Neos', logoNeos],
  ['Strauman', logoStrauman],
  ['Unseal', logoUnseal],
]

type ServiceCategoryTranslations = {
  title: string
  description: string
  categories: {
    general: {
      title: string
      heading: string
      description: string
    }
    dental: {
      title: string
      heading: string
      description: string
    }
    aesthetics: {
      title: string
      heading: string
      description: string
    }
  }
}

type ServicesTranslations = {
  eyebrow: string
  title: string
  description: string
  list: {
    general: {
      title: string
      description: string
    }
    cosmetic: {
      title: string
      description: string
    }
    restorative: {
      title: string
      description: string
    }
    pediatric: {
      title: string
      description: string
    }
  }
}

function Clients({ title }: { title: string }) {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-900 py-20 sm:mx-10 lg:mt-42">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {title}
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

function ServiceCategory({
  translations,
}: {
  translations: ServiceCategoryTranslations
}) {
  return (
    <div id="services">
      <SectionIntro title={translations.title} className="pt-24">
        <p className="sm:text-md font-display text-sm text-neutral-500">
          {translations.description}
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
                {translations.categories.general.title}
              </p>
              <p className="mt-6 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text font-display text-2xl font-semibold text-neutral-950 text-transparent">
                {translations.categories.general.heading}
              </p>
              <p className="mt-4 text-base text-neutral-600">
                {translations.categories.general.description}
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
                {translations.categories.dental.title}
              </p>
              <p className="mt-6 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text font-display text-2xl font-semibold text-neutral-950 text-transparent">
                {translations.categories.dental.heading}
              </p>
              <p className="mt-4 text-base text-neutral-600">
                {translations.categories.dental.description}
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
                {translations.categories.aesthetics.title}
              </p>
              <p className="mt-6 bg-gradient-to-r from-neutral-950 to-neutral-700 bg-clip-text font-display text-2xl font-semibold text-neutral-950 text-transparent">
                {translations.categories.aesthetics.heading}
              </p>
              <p className="mt-4 text-base text-neutral-600">
                {translations.categories.aesthetics.description}
              </p>
            </article>
          </FadeIn>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Services({ translations }: { translations: ServicesTranslations }) {
  return (
    <>
      <SectionIntro
        eyebrow={translations.eyebrow}
        title={translations.title}
        className="mt-24 font-display sm:mt-32"
      >
        <p className="sm:text-md text-sm text-neutral-600">
          {translations.description}
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
                shape={1}
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title={translations.list.general.title}>
              {translations.list.general.description}
            </ListItem>
            <ListItem title={translations.list.cosmetic.title}>
              {translations.list.cosmetic.description}
            </ListItem>
            <ListItem title={translations.list.restorative.title}>
              {translations.list.restorative.description}
            </ListItem>
            <ListItem title={translations.list.pediatric.title}>
              {translations.list.pediatric.description}
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
  const t = await getTranslations('home')
  const caseStudies = (await loadCaseStudies()).slice(0, 3)

  const serviceCategoryTranslations: ServiceCategoryTranslations = {
    title: t('services.title'),
    description: t('services.description'),
    categories: {
      general: {
        title: t('services.categories.general.title'),
        heading: t('services.categories.general.heading'),
        description: t('services.categories.general.description'),
      },
      dental: {
        title: t('services.categories.dental.title'),
        heading: t('services.categories.dental.heading'),
        description: t('services.categories.dental.description'),
      },
      aesthetics: {
        title: t('services.categories.aesthetics.title'),
        heading: t('services.categories.aesthetics.heading'),
        description: t('services.categories.aesthetics.description'),
      },
    },
  }

  const servicesTranslations: ServicesTranslations = {
    eyebrow: t('services.comprehensive.eyebrow'),
    title: t('services.comprehensive.title'),
    description: t('services.comprehensive.description'),
    list: {
      general: {
        title: t('services.comprehensive.list.general.title'),
        description: t('services.comprehensive.list.general.description'),
      },
      cosmetic: {
        title: t('services.comprehensive.list.cosmetic.title'),
        description: t('services.comprehensive.list.cosmetic.description'),
      },
      restorative: {
        title: t('services.comprehensive.list.restorative.title'),
        description: t('services.comprehensive.list.restorative.description'),
      },
      pediatric: {
        title: t('services.comprehensive.list.pediatric.title'),
        description: t('services.comprehensive.list.pediatric.description'),
      },
    },
  }

  return (
    <>
      <Container className="mt-16 font-display">
        <div className="flex flex-col gap-[140px] lg:flex-row">
          <div className="sm:mt-32">
            <h1 className="font-display text-5xl font-medium tracking-tight [text-wrap:balance] text-neutral-950 sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg text-neutral-500">{t('description')}</p>

            <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row">
              <CalendlyButton />
              <SmoothScrollLink
                targetId="services"
                className="cursor-pointer rounded-md border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:outline-none"
              >
                {t('viewServices')}
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

      <Clients title={t('clients.title')} />

      <ServiceCategory translations={serviceCategoryTranslations} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Bright Smiles', logo: logoPhobiaDark }}
      >
        {t('testimonial.text')}
      </Testimonial>

      <Services translations={servicesTranslations} />

      <ContactSection />
    </>
  )
}
