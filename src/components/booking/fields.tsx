'use client'

import { useId } from 'react'

const inputBase =
  'mt-1.5 block w-full rounded-xl border bg-white px-4 py-2.5 text-base text-warm-dark outline-none transition placeholder:text-taupe/50 focus:ring-2 focus:ring-mocha/20'

function borderClass(error?: string): string {
  return error
    ? 'border-red-400 focus:border-red-500'
    : 'border-mocha/20 focus:border-mocha'
}

interface TextFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> {
  label: string
  error?: string
}

export function TextField({
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-warm-dark">
        {label}
      </label>
      <input id={id} {...props} className={`${inputBase} ${borderClass(error)}`} />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

interface TextAreaFieldProps
  extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id'> {
  label: string
  error?: string
}

export function TextAreaField({
  label,
  error,
  className,
  ...props
}: TextAreaFieldProps) {
  const id = useId()
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-warm-dark">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className={`${inputBase} ${borderClass(error)}`}
      />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}
