import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { playfair, raleway } from '@/lib/fonts'

// Rendered outside `[locale]/layout.tsx`, so it has to provide its own
// `<html>` and `<body>`.
export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${playfair.variable} h-full bg-white text-base text-ink antialiased`}
    >
      <body className="flex min-h-full flex-col font-light">
        <Container className="flex h-full items-center pt-24 sm:pt-32 lg:pt-40">
          <FadeIn className="flex max-w-xl flex-col items-center text-center">
            <p className="font-display text-6xl text-neutral-950 sm:text-7xl">
              404
            </p>
            <h1 className="mt-4 text-3xl normal-case text-neutral-950">
              Page not found
            </h1>
            <p className="mt-2 text-sm text-neutral-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <Link
              href="/"
              className="button dark mt-8"
            >
              Go to the home page
            </Link>
          </FadeIn>
        </Container>
      </body>
    </html>
  )
}
