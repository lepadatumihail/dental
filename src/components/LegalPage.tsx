import { getTranslations } from 'next-intl/server'

import { CookieSettings } from '@/components/CookieSettings'
import { PageIntro } from '@/components/PageIntro'
import { Link } from '@/i18n/navigation'
import { createPageMetadata } from '@/lib/canonical'
import {
  CLINIC_COMPANY,
  CLINIC_EMAIL,
  CLINIC_PHONE,
  CLINIC_PHONE_E164,
} from '@/lib/clinic'
import { LEGAL_PAGES, type LegalPageKey } from '@/lib/legal'

export async function legalMetadata(locale: string, page: LegalPageKey) {
  const t = await getTranslations({ locale, namespace: `legal.${page}` })
  return createPageMetadata({
    locale,
    path: LEGAL_PAGES[page],
    title: t('title'),
    description: t('description'),
  })
}

export async function LegalPage({ page }: { page: LegalPageKey }) {
  const t = await getTranslations('legal')
  const values = {
    company: CLINIC_COMPANY.name,
    taxId: CLINIC_COMPANY.taxId,
    address: CLINIC_COMPANY.address,
  }
  const sections = t.raw(`${page}.sections`) as Array<{
    title: string
    body: string
  }>

  const companyDetails = (
    <section>
      <h2>{t('company')}</h2>
      <dl className="legal-company">
        <div>
          <dt>{t('company')}</dt>
          <dd>{CLINIC_COMPANY.name}</dd>
        </div>
        <div>
          <dt>{t('taxId')}</dt>
          <dd>{CLINIC_COMPANY.taxId}</dd>
        </div>
        <div>
          <dt>{t('address')}</dt>
          <dd>{CLINIC_COMPANY.address}</dd>
        </div>
        <div>
          <dt>{t('email')}</dt>
          <dd>
            <a href={`mailto:${CLINIC_EMAIL}`}>{CLINIC_EMAIL}</a>
          </dd>
        </div>
        <div>
          <dt>{t('phone')}</dt>
          <dd>
            <a href={`tel:${CLINIC_PHONE_E164}`}>{CLINIC_PHONE}</a>
          </dd>
        </div>
      </dl>
      <p>{t('contact')}</p>
    </section>
  )

  return (
    <>
      <PageIntro eyebrow={t('eyebrow')} title={t(`${page}.title`)}>
        <p>{t(`${page}.intro`, values)}</p>
      </PageIntro>
      <div className="legal-layout">
        <nav className="legal-nav" aria-label={t('navigation')}>
          {Object.entries(LEGAL_PAGES).map(([key, href]) => (
            <Link
              key={key}
              href={href}
              aria-current={key === page ? 'page' : undefined}
            >
              {t(`${key}.title`)}
            </Link>
          ))}
          <CookieSettings />
        </nav>
        <article className="legal-content">
          <p className="legal-updated">{t('updated')}</p>
          {page === 'notice' && companyDetails}
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{t(`${page}.sections.${index}.body`, values)}</p>
            </section>
          ))}
          {page === 'privacy' && (
            <p>
              <a href="https://www.aepd.es/">
                Agencia Española de Protección de Datos (AEPD)
              </a>
            </p>
          )}
          {page !== 'notice' && companyDetails}
        </article>
      </div>
    </>
  )
}
