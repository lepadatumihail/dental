import type { StaticImageData } from 'next/image'

import dentistry from '@/images/prisma/areas/dentistry.jpg'
import aesthetics from '@/images/prisma/areas/aesthetics.jpg'
import medicine from '@/images/prisma/areas/medicine.jpg'
import massage from '@/images/prisma/areas/massage.jpg'

/** Treatment areas; copy lives under `areas.<key>` in locales/*.json. */
export interface TreatmentArea {
  key: 'dental' | 'aesthetics' | 'medical' | 'massage'
  number: string
  href: string
  image: StaticImageData
  /** `booking.services.*` key, when the area is bookable online. */
  bookingKey?: 'dental' | 'aesthetics' | 'medical'
}

export const TREATMENT_AREAS: ReadonlyArray<TreatmentArea> = [
  {
    key: 'dental',
    number: '01',
    href: '/services/dental',
    image: dentistry,
    bookingKey: 'dental',
  },
  {
    key: 'aesthetics',
    number: '02',
    href: '/services/aesthetics',
    image: aesthetics,
    bookingKey: 'aesthetics',
  },
  {
    key: 'medical',
    number: '03',
    href: '/services/general-medicine',
    image: medicine,
    bookingKey: 'medical',
  },
  {
    key: 'massage',
    number: '04',
    href: '/services/massage-therapy',
    image: massage,
  },
]
