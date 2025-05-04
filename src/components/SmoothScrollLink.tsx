'use client'

import { useCallback } from 'react'

type SmoothScrollLinkProps = {
  targetId: string
  className?: string
  children: React.ReactNode
}

export default function SmoothScrollLink({
  targetId,
  className,
  children,
}: SmoothScrollLinkProps) {
  const handleClick = useCallback(() => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [targetId])

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
