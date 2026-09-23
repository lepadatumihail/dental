import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import { CookieSettings } from '@/components/CookieSettings'
import { FadeIn } from '@/components/FadeIn'
import { Link } from '@/i18n/navigation'
import { CLINIC_PHONE, CLINIC_PHONE_E164 } from '@/lib/clinic'

import Logo from '../../public/logo-dark.png'

function FooterNav() {
  const t = useTranslations('layout')
  const tLocations = useTranslations('home.locations')

  const columns = [
    {
      title: t('navigation.items.treatments.label'),
      links: [
        { label: t('navigation.items.treatments.dental'), href: '/services/dental' },
        { label: t('navigation.items.treatments.aesthetic'), href: '/services/aesthetics' },
        { label: t('navigation.items.treatments.medical'), href: '/services/general-medicine' },
        { label: t('navigation.items.treatments.massage'), href: '/services/massage-therapy' },
        { label: t('navigation.items.emergencies'), href: '/services/emergency' },
      ],
    },
    {
      title: t('footer.clinic'),
      links: [
        { label: t('navigation.items.theClinic'), href: '/about' },
        { label: t('navigation.items.ourPrices'), href: '/pricing' },
        { label: t('footer.blog'), href: '/blog' },
        { label: t('navigation.items.contact'), href: '/contact' },
      ],
    },
  ]

  return (
    <div className="mt-20 grid grid-cols-2 gap-10 sm:grid-cols-3">
      {columns.map((column) => (
        <nav key={column.title} aria-label={column.title}>
          <h2 className="text-[11px] font-semibold tracking-[0.25em] text-taupe uppercase">
            {column.title}
          </h2>
          <ul role="list" className="mt-5 space-y-3 text-sm">
            {column.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-warm-dark transition-colors duration-150 hover:text-mocha"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}

      <div className="col-span-2 sm:col-span-1">
        <h2 className="text-[11px] font-semibold tracking-[0.25em] text-taupe uppercase">
          {t('footer.visitUs')}
        </h2>
        <address className="mt-5 space-y-4 text-sm text-warm-dark not-italic">
          {(['banus', 'oldTown'] as const).map((key) => (
            <p key={key}>
              <span className="font-semibold">{tLocations(`${key}.name`)}</span>
              <br />
              {tLocations(`${key}.address`)}
            </p>
          ))}
          <p>
            <a
              href={`tel:${CLINIC_PHONE_E164}`}
              className="font-semibold transition-colors duration-150 hover:text-mocha"
            >
              {CLINIC_PHONE}
            </a>
            <br />
            {tLocations('openingHoursValue')}
          </p>
        </address>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-12 w-full">
      <FadeIn>
        <h2 className="mb-8 text-center font-display text-4xl font-medium tracking-tight text-neutral-900">
           Location
        </h2>
        <div className="mt-6 overflow-hidden rounded-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3206.0238356449193!2d-4.889272488857869!3d36.50901447991112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd73218056e8e6dd%3A0x2df2a27c598cc9fc!2sAv.%20de%20Nabeul%2C%2014%2C%2029601%20Marbella%2C%20M%C3%A1laga%2C%20Spain!5e0!3m2!1sen!2sus!4v1655308001000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Prisma Clinic Marbella Location Map"
          />
        </div>
        <FooterNav />
        <div className="mt-16 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Image
              src={Logo}
              alt="Prisma Clinic Marbella Logo"
              width={150}
              height={150}
            />
          </Link>
          <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center">
            <CookieSettings />
            <p className="text-sm text-neutral-700">
              © Prisma Clinic Marbella {new Date().getFullYear()}
            </p>
            <p className="text-sm text-neutral-500">
              Website by{' '}
              <a
                href="https://lepadatu.dev"
                target="_blank"
                rel="noopener"
                title="Mihail Lepadatu — web development"
                className="text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition hover:text-neutral-950 hover:decoration-neutral-950"
              >
                Lepadatu.dev
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
