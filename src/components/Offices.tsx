import clsx from 'clsx'
import { useTranslations } from 'next-intl'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic leading-relaxed',
        invert ? 'text-taupe' : 'text-taupe',
      )}
    >
      <strong className="text-base font-semibold text-warm-dark">
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  const t = useTranslations('office')

  return (
    <ul {...props}>
      <li>
        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <Office name={t('name')} invert={invert}>
            <div className="min-w-xs mt-3">
              {t('address')}
              <br />
              {t('country')}
              <br />
              <br />
            </div>
            <span className="font-medium text-warm-dark">
              {t('phone')}:{' '}
            </span>

            <a
              href="tel:+34673290786"
              className="font-medium text-warm-dark hover:text-mocha transition-colors"
            >
              {t('phoneNumber')}
            </a>
            <br />
            <a
              href="https://wa.me/+34673290786"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-medium text-warm-success underline hover:text-warm-success/80 transition-colors"
            >
              WhatsApp
            </a>
          </Office>
          <div
            className={clsx(
              'min-w-xs text-sm not-italic leading-relaxed mt-3',
              invert ? 'text-taupe' : 'text-taupe',
            )}
          >
            <span className="text-base font-semibold text-warm-dark"
            >
              {t('openingHours')}:
            </span>
            <br />
            <div className="mt-3">
              {t('weekdays')}
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}
