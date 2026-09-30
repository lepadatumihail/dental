import type { StaticImageData } from 'next/image'

import behrouz from '@/images/prisma/specialists/behrouz-rajabi.jpg'
import afshin from '@/images/prisma/specialists/dr-afshin-moheb.jpg'
import angelo from '@/images/prisma/specialists/dr-angelo-termini.jpg'
import bozana from '@/images/prisma/specialists/dr-bozana-krivosija.jpg'
import darina from '@/images/prisma/specialists/dr-darina-sansasvili.jpg'
import robbin from '@/images/prisma/specialists/dr-robbin.jpg'

import behrouzIntro from '@/images/prisma/profiles/behrouz-intro.jpg'
import behrouzMethod from '@/images/prisma/profiles/behrouz-method.jpg'
import behrouzTreatments from '@/images/prisma/profiles/behrouz-treatments.jpg'
import afshinIntro from '@/images/prisma/profiles/afshin-intro.jpg'
import afshinExpertise from '@/images/prisma/profiles/afshin-expertise.jpg'
import afshinTreatments from '@/images/prisma/profiles/afshin-treatments.jpg'
import angeloIntro from '@/images/prisma/profiles/angelo-intro.jpg'
import angeloExpertise from '@/images/prisma/profiles/angelo-expertise.jpg'
import angeloTreatments from '@/images/prisma/profiles/angelo-treatments.jpg'
import bozanaIntro from '@/images/prisma/profiles/bozana-intro.jpg'
import bozanaPhilosophy from '@/images/prisma/profiles/bozana-philosophy.jpg'
import bozanaTreatments from '@/images/prisma/profiles/bozana-treatments.jpg'
import darinaIntro from '@/images/prisma/profiles/darina-intro.jpg'
import darinaExpertise from '@/images/prisma/profiles/darina-expertise.jpg'
import darinaTreatments from '@/images/prisma/profiles/darina-treatments.jpg'
import robbinIntro from '@/images/prisma/profiles/robbin-intro.jpg'
import robbinExpertise from '@/images/prisma/profiles/robbin-expertise.jpg'
import robbinTreatments from '@/images/prisma/profiles/robbin-treatments.jpg'

export interface Specialist {
  /** URL segment under /specialists and key under `specialists.people`. */
  slug: string
  /** Full name as shown on the profile (proper noun, not translated). */
  name: string
  /** Name without post-nominals, for "Book with …" style copy. */
  shortName: string
  image: StaticImageData
  /** Profile graphics: introduction, expertise/method, signature treatments. */
  gallery: [StaticImageData, StaticImageData, StaticImageData]
  /** `booking.services.*` key to pre-select in the booking modal, if any. */
  bookingKey?: 'dental' | 'aesthetics' | 'medical'
}

export const SPECIALIST_PROFILES: ReadonlyArray<Specialist> = [
  {
    slug: 'behrouz-rajabi',
    name: 'Behrouz Rajabi',
    shortName: 'Behrouz Rajabi',
    image: behrouz,
    gallery: [behrouzIntro, behrouzMethod, behrouzTreatments],
  },
  {
    slug: 'dr-afshin-moheb',
    name: 'Dr. Afshin Moheb',
    shortName: 'Dr. Afshin Moheb',
    image: afshin,
    gallery: [afshinIntro, afshinExpertise, afshinTreatments],
    bookingKey: 'aesthetics',
  },
  {
    slug: 'dr-angelo-termini',
    name: 'Dr. Angelo Termini, PhD',
    shortName: 'Dr. Angelo Termini',
    image: angelo,
    gallery: [angeloIntro, angeloExpertise, angeloTreatments],
    bookingKey: 'medical',
  },
  {
    slug: 'dr-bozana-krivosija',
    name: 'Dr. Bozana Krivosija',
    shortName: 'Dr. Bozana Krivosija',
    image: bozana,
    gallery: [bozanaIntro, bozanaPhilosophy, bozanaTreatments],
    bookingKey: 'aesthetics',
  },
  {
    slug: 'dr-darina-sansasvili',
    name: 'Dr. Darina Sansasvili',
    shortName: 'Dr. Darina Sansasvili',
    image: darina,
    gallery: [darinaIntro, darinaExpertise, darinaTreatments],
    bookingKey: 'aesthetics',
  },
  {
    slug: 'dr-robbin',
    name: 'Dr. Robbin',
    shortName: 'Dr. Robbin',
    image: robbin,
    gallery: [robbinIntro, robbinExpertise, robbinTreatments],
    bookingKey: 'dental',
  },
]

export function findSpecialist(slug: string): Specialist | undefined {
  return SPECIALIST_PROFILES.find((s) => s.slug === slug)
}
