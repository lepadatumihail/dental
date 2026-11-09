import type { StaticImageData } from 'next/image'

import dentistry from '@/images/prisma/areas/dentistry.jpg'
import aesthetics from '@/images/prisma/areas/aesthetics.jpg'
import medicine from '@/images/prisma/areas/medicine.jpg'

/** Treatment areas; copy lives under `areas.<key>` in locales/*.json. */
export interface TreatmentArea {
  key: 'dental' | 'aesthetics' | 'medical'
  number: string
  href: string
  image: StaticImageData
}

export const TREATMENT_AREAS: ReadonlyArray<TreatmentArea> = [
  {
    key: 'dental',
    number: '01',
    href: '/services/dental',
    image: dentistry,
  },
  {
    key: 'aesthetics',
    number: '02',
    href: '/services/aesthetics',
    image: aesthetics,
  },
  {
    key: 'medical',
    number: '03',
    href: '/services/general-medicine',
    image: medicine,
  },
]
