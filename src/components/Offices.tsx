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
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
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
            <div className="min-w-xs">
              {t('address')}
              <br />
              {t('country')}
              <br />
              <br />
            </div>
            <span className={invert ? 'text-white' : 'text-neutral-950'}>
              {t('phone')}:
            </span>
            <br />
            {t('phoneNumber')}
          </Office>
          <div
            className={clsx(
              'min-w-xs text-sm not-italic',
              invert ? 'text-neutral-300' : 'text-neutral-600',
            )}
          >
            <span
              className={invert ? 'font-bold text-white' : 'text-neutral-950'}
            >
              {t('openingHours')}:
            </span>
            <br />
            {t('weekdays')}
            <br />
            {t('saturday')}
            <br />
            {t('sunday')}
            <br />
            <br />
          </div>
        </div>
      </li>
    </ul>
  )
}
