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
      'inline-flex rounded-lg px-5 py-3 text-sm font-medium transition-colors duration-150',
      invert
        ? 'bg-white text-forest hover:bg-surface-200'
        : 'bg-mocha text-white hover:bg-mocha-dark',
      className,
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
