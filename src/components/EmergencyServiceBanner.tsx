import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Phone, FirstAid, Clock } from '@phosphor-icons/react/dist/ssr'

export function EmergencyServiceBanner() {
  return (
    <Container className="mt-12">
      <FadeIn>
        <div className="overflow-hidden rounded-2xl bg-neutral-900 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 text-white md:p-12">
              <div className="mb-4 flex items-center gap-3">
                <FirstAid size={32} weight="duotone" className="text-white" />
                <h2 className="font-display text-3xl font-medium tracking-tight text-white">
                  24/7 Emergency Dental Care
                </h2>
              </div>
              <p className="mb-6 text-white/80">
                Dental emergencies don&apos;t wait for business hours. Our team
                of specialists is available around the clock to provide
                immediate care when you need it most.
              </p>
              <ul className="mb-8 list-disc space-y-1 pl-5 text-white/80">
                <li>Severe toothache or dental pain</li>
                <li>Broken or chipped teeth</li>
                <li>Lost crowns or fillings</li>
                <li>Dental trauma from accidents</li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button href="/services/emergency" invert>
                  Learn More
                </Button>
                <Button
                  href="tel:+34673290786"
                  invert
                  className="border border-white bg-transparent hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="mr-2" size={20} />
                    Emergency Hotline
                  </div>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-10 text-white md:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="mb-6 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <Clock size={24} className="text-white/80" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Available 24/7
                      </h3>
                      <p className="text-sm text-white/70">
                        Including weekends and holidays
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={24} className="text-white/80" />
                    <div>
                      <h3 className="font-semibold text-white">
                        Direct Hotline
                      </h3>
                      <p className="text-sm text-white/70">+34 673 290 786</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-medium tracking-wider text-white/60 uppercase">
                    Emergency Dental Care
                  </p>
                  <p className="text-2xl font-bold text-white">
                    Marbella&apos;s Premier 24/7 Service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
