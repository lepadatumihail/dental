import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { CookieSettings } from '@/components/CookieSettings'
import { Link } from '@/i18n/navigation'
import { LEGAL_PAGES } from '@/lib/legal'
import {
  CLINIC_COMPANY,
  CLINIC_EMAIL,
  CLINIC_PHONE,
  CLINIC_PHONE_E164,
  WHATSAPP_URL,
} from '@/lib/clinic'

import wordmark from '@/images/prisma/brand/prisma-wordmark.png'

export function Footer() {
  const t = useTranslations('site')
  const legal = useTranslations('legal')

  return (
    <footer className="footer">
      <div className="footer-brand">
        <Link href="/" className="brand" aria-label={t('nav.home')}>
          <Image src={wordmark} alt="Prisma Clinic" sizes="190px" />
        </Link>
        <p>{t('footer.tagline')}</p>
      </div>
      <div>
        <span>{t('footer.explore')}</span>
        <Link href="/services">{t('nav.treatments')}</Link>
        <Link href="/specialists">{t('nav.specialists')}</Link>
        <Link href="/pricing">{t('nav.prices')}</Link>
        <Link href="/memberships">{t('nav.memberships')}</Link>
        <Link href="/dental-tourism">{t('nav.dentalTourism')}</Link>
        <Link href="/results">{t('footer.results')}</Link>
      </div>
      <div>
        <span>{t('footer.visit')}</span>
        <Link href="/doctor-online">{t('nav.doctorOnline')}</Link>
        <Link href="/prisma-care">{t('nav.prismaCare')}</Link>
        <Link href="/clinics">{t('footer.ourClinics')}</Link>
        <Link href="/about">{t('footer.about')}</Link>
        <Link href="/services/emergency">{t('nav.emergency')}</Link>
      </div>
      <div>
        <span>{t('footer.connect')}</span>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href={`mailto:${CLINIC_EMAIL}`}>{t('footer.email')}</a>
        <a href={`tel:${CLINIC_PHONE_E164}`}>{CLINIC_PHONE}</a>
        <Link href="/contact">{t('footer.contact')}</Link>
        <Link href="/blog">{t('footer.blog')}</Link>
      </div>
      <div className="copyright">
        <nav className="footer-legal" aria-label={legal('navigation')}>
          {Object.entries(LEGAL_PAGES).map(([key, href]) => (
            <Link key={key} href={href}>
              {legal(`${key}.title`)}
            </Link>
          ))}
        </nav>
        <p>
          {CLINIC_COMPANY.name} · CIF {CLINIC_COMPANY.taxId}
        </p>
        <p>
          © {new Date().getFullYear()} Prisma Clinic Marbella.{' '}
          {t('footer.disclaimer')}
        </p>
        <div className="copyright-meta">
          <CookieSettings />
          <p>
            {t('footer.websiteBy')}{' '}
            <a
              href="https://lepadatu.dev"
              target="_blank"
              rel="noopener"
              title="Mihail Lepadatu — web development"
            >
              Lepadatu.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
