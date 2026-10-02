import Image, { type ImageProps } from 'next/image'

/**
 * A photograph. next/image re-encodes at quality 75 unless told otherwise,
 * which visibly softens photos that already arrive compressed, so photos are
 * served at 90. `focus` is the CSS `object-position` that keeps the subject
 * (usually a face) inside a frame that crops the photo.
 */
export function Photo({
  alt,
  focus,
  style,
  ...props
}: ImageProps & { focus?: string }) {
  return (
    <Image
      alt={alt}
      quality={90}
      {...props}
      style={focus ? { objectPosition: focus, ...style } : style}
    />
  )
}
