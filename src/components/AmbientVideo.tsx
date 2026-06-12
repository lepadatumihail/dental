'use client'

type AmbientVideoProps = {
  src: string
  ariaLabel?: string
  className?: string
}

export function AmbientVideo({ src, ariaLabel, className }: AmbientVideoProps) {
  return (
    <video
      src={src}
      aria-label={ariaLabel}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      ref={(el) => {
        // React omits the muted attribute from SSR markup, which blocks
        // autoplay policies; re-assert and kick playback on mount.
        if (el) {
          el.muted = true
          el.play().catch(() => {})
        }
      }}
    />
  )
}
