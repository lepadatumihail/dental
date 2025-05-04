import clsx from 'clsx'

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
  return (
    <ul {...props}>
      <li>
        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <Office name="Prisma Clinic Marbella" invert={invert}>
            <div className="min-w-xs">
              Av. de Nabeul, 14, 29601 Marbella, Málaga
              <br />
              Spain
              <br />
              <br />
            </div>
            <span className={invert ? 'text-white' : 'text-neutral-950'}>
              Phone:
            </span>
            <br />
            +34 951 123 456
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
              Opening Hours:
            </span>
            <br />
            Monday - Friday: 9:00 AM - 7:00 PM
            <br />
            Saturday: 10:00 AM - 2:00 PM
            <br />
            Sunday: Closed
            <br />
            <br />
          </div>
        </div>
      </li>
    </ul>
  )
}
