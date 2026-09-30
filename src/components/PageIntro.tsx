import Image from 'next/image'

import monogram from '@/images/prisma/brand/prisma-monogram.png'

/** Text-only page opener (contact, blog, services index): the inner hero. */
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  /** Kept for existing call sites; the inner hero is always left-aligned. */
  centered?: boolean
}) {
  return (
    <section className="inner-hero">
      <Image src={monogram} alt="" priority sizes="600px" />
      <div>
        <p className="eyebrow gold">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="inner-hero-intro">{children}</div>
      </div>
    </section>
  )
}
