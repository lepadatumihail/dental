import Link from 'next/link'
import clsx from 'clsx'

type ButtonProps = {
  invert?: boolean
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  invert = false,
  className,
  children,
  ...props
}: ButtonProps) {
    className = clsx(
    className,
    'inline-flex rounded-lg px-5 py-3 font-display text-sm font-medium transition-colors duration-150 ring-1 ring-inset ring-warm-dark/10',
    invert
      ? 'bg-surface-100 text-warm-dark hover:text-accent-hover'
      : 'bg-surface-300 text-warm-dark hover:text-accent-hover',
  )

  let inner = <span className="relative top-px">{children}</span>

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
