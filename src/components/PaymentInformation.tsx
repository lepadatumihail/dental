import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function PaymentInformation({
  showPrice = false,
}: {
  showPrice?: boolean
}) {
  const t = useTranslations('legal')
  return (
    <aside className="payment-information">
      {showPrice && (
        <>
          <h2>{t('priceTitle')}</h2>
          <p>{t('priceBody')}</p>
          <p>{t('summary')}</p>
        </>
      )}
      <p>{t('beforePayment')}</p>
      <div className="payment-links">
        <Link href="/terms-and-conditions">{t('terms.title')}</Link>
        <Link href="/privacy-policy">{t('privacyLink')}</Link>
      </div>
    </aside>
  )
}
