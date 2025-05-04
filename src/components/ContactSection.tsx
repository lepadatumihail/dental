import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32">
      <FadeIn className="-mx-4 rounded-4xl border border-neutral-700/40 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 py-20 shadow-xl backdrop-blur-sm sm:mx-0 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-3xl font-medium [text-wrap:balance] text-white sm:text-4xl">
            24/7 Emergency Dental Care
          </h2>
          <div className="mt-4 flex w-full flex-row justify-between">
            <div className="w-full sm:w-1/2">
              <p className="text-white/80">
                Dental emergencies don&apos;t wait for business hours. Our team
                of specialists is available around the clock to provide
                immediate care when you need it most.
              </p>
            </div>
            <ul className="hidden list-disc space-y-1 pl-5 text-white/80 sm:block">
              <li>Severe toothache or dental pain</li>
              <li>Broken or chipped teeth</li>
              <li>Lost crowns or fillings</li>
              <li>Dental trauma from accidents</li>
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Button href="/services/emergency" invert>
              Learn More
            </Button>
            <Button
              target="_blank"
              href="https://wa.me/+34673290786"
              invert
              className="border border-white bg-transparent hover:bg-white/10"
            >
              Emergency Hotline
            </Button>
          </div>
          <div className="mt-10 border-t border-white/10 pt-10">
            <h3 className="font-display text-base font-semibold text-white">
              Our Location
            </h3>
            <Offices invert className="mt-6 w-full" />
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
