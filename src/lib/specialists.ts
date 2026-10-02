import type { StaticImageData } from 'next/image'

import behrouz from '@/images/prisma/specialists/behrouz-rajabi.jpg'
import afshin from '@/images/prisma/specialists/dr-afshin-moheb.jpg'
import angelo from '@/images/prisma/specialists/dr-angelo-termini.jpg'
import bozana from '@/images/prisma/specialists/dr-bozana-krivosija.jpg'
import darina from '@/images/prisma/specialists/dr-darina-sansasvili.jpg'
import robbin from '@/images/prisma/specialists/dr-robbin.jpg'

import behrouzThumb from '@/images/prisma/specialists/thumbs/behrouz-rajabi.jpg'
import afshinThumb from '@/images/prisma/specialists/thumbs/dr-afshin-moheb.jpg'
import angeloThumb from '@/images/prisma/specialists/thumbs/dr-angelo-termini.jpg'
import bozanaThumb from '@/images/prisma/specialists/thumbs/dr-bozana-krivosija.jpg'
import darinaThumb from '@/images/prisma/specialists/thumbs/dr-darina-sansasvili.jpg'
import robbinThumb from '@/images/prisma/specialists/thumbs/dr-robbin.jpg'

import behrouzIntro from '@/images/prisma/profiles/behrouz-intro.jpg'
import behrouzMethod from '@/images/prisma/profiles/behrouz-method.jpg'
import afshinIntro from '@/images/prisma/profiles/afshin-intro.jpg'
import afshinExpertise from '@/images/prisma/profiles/afshin-expertise.jpg'
import angeloIntro from '@/images/prisma/profiles/angelo-intro.jpg'
import angeloExpertise from '@/images/prisma/profiles/angelo-expertise.jpg'
import bozanaIntro from '@/images/prisma/profiles/bozana-intro.jpg'
import bozanaPhilosophy from '@/images/prisma/profiles/bozana-philosophy.jpg'
import darinaIntro from '@/images/prisma/profiles/darina-intro.jpg'
import darinaExpertise from '@/images/prisma/profiles/darina-expertise.jpg'
import robbinIntro from '@/images/prisma/profiles/robbin-intro.jpg'
import robbinExpertise from '@/images/prisma/profiles/robbin-expertise.jpg'

export interface Specialist {
  /** URL segment under /specialists and key under `specialists.people`. */
  slug: string
  /** Full name as shown on the profile (proper noun, not translated). */
  name: string
  /** Name without post-nominals, for "Book with …" style copy. */
  shortName: string
  image: StaticImageData
  /** Square head-and-shoulders crop for lists. */
  thumb: StaticImageData
  /** Profile graphics: introduction and expertise/method. */
  gallery: [StaticImageData, StaticImageData]
}

export const SPECIALIST_PROFILES: ReadonlyArray<Specialist> = [
  {
    slug: 'behrouz-rajabi',
    name: 'Behrouz Rajabi',
    shortName: 'Behrouz Rajabi',
    image: behrouz,
    thumb: behrouzThumb,
    gallery: [behrouzIntro, behrouzMethod],
  },
  {
    slug: 'dr-afshin-moheb',
    name: 'Dr. Afshin Moheb',
    shortName: 'Dr. Afshin Moheb',
    image: afshin,
    thumb: afshinThumb,
    gallery: [afshinIntro, afshinExpertise],
  },
  {
    slug: 'dr-angelo-termini',
    name: 'Dr. Angelo Termini, PhD',
    shortName: 'Dr. Angelo Termini',
    image: angelo,
    thumb: angeloThumb,
    gallery: [angeloIntro, angeloExpertise],
  },
  {
    slug: 'dr-bozana-krivosija',
    name: 'Dr. Bozana Krivosija',
    shortName: 'Dr. Bozana Krivosija',
    image: bozana,
    thumb: bozanaThumb,
    gallery: [bozanaIntro, bozanaPhilosophy],
  },
  {
    slug: 'dr-darina-sansasvili',
    name: 'Dr. Darina Sansasvili',
    shortName: 'Dr. Darina Sansasvili',
    image: darina,
    thumb: darinaThumb,
    gallery: [darinaIntro, darinaExpertise],
  },
  {
    slug: 'dr-robbin',
    name: 'Dr. Robbin',
    shortName: 'Dr. Robbin',
    image: robbin,
    thumb: robbinThumb,
    gallery: [robbinIntro, robbinExpertise],
  },
]

export function findSpecialist(slug: string): Specialist | undefined {
  return SPECIALIST_PROFILES.find((s) => s.slug === slug)
}
