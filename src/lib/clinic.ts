// Facts about the clinic shared by the footer, JSON-LD and llms.txt. Keep them
// in sync with the copy in `locales/*.json`.

export const CLINIC_PHONE = '+34 673 290 786'
export const CLINIC_PHONE_E164 = '+34673290786'
// wa.me expects the number without the leading +.
export const WHATSAPP_URL = `https://wa.me/${CLINIC_PHONE_E164.slice(1)}`
export const CLINIC_EMAIL = 'info@prismaclinicmarbella.es'

/** WhatsApp chat link with a pre-filled message. */
export function whatsappLink(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`
}

/** The clinic's Google reviews, where every patient story lives. */
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?sa=X&sca_esv=d4004dff2930eec9&hl=es-ES&q=Prisma+Clinic+Marbella+Rese%C3%B1as&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2MjY0NDU2MrcwNjE3tzA1MDGw3MDI-IpRPqAoszg3UcE5JzMvM1nBN7EoKTUnJ1EhKLU49fDGxOJFrIRUAADaG9GUXgAAAA&rldimm=2311532783477850409&tbm=lcl#lkt=LocalPoiReviews'

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/p/Prisma-Clinic-Marbella-61577789463482/',
  'https://www.instagram.com/prismaclinicmarbella/',
]

// Spoken by the team.
export const LANGUAGES_SPOKEN = ['Spanish', 'English', 'Swedish', 'German', 'Farsi']

export interface ClinicLocation {
  id: 'banus' | 'old-town'
  name: string
  streetAddress: string
  postalCode: string
  locality: string
  region: string
  country: string
  mapsUrl: string
}

export const LOCATIONS: ReadonlyArray<ClinicLocation> = [
  {
    id: 'banus',
    name: 'Prisma Clinic Banús',
    streetAddress:
      'Calle Ramón Areces, s/n, Plaza Marina Banús (frente El Corte Inglés)',
    postalCode: '29660',
    locality: 'Marbella',
    region: 'Málaga',
    country: 'ES',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Calle Ramón Areces, Plaza Marina Banús, 29660 Marbella'),
  },
  {
    id: 'old-town',
    name: 'Prisma Clinic Old Town',
    streetAddress: 'Av. de Nabeul, 14',
    postalCode: '29601',
    locality: 'Marbella',
    region: 'Málaga',
    country: 'ES',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('Av. de Nabeul, 14, 29601 Marbella'),
  },
]

export interface ClinicSpecialist {
  id: string
  name: string
  jobTitle: string
  /** schema.org MedicalSpecialty values; left empty when none fits. */
  specialties: Array<string>
  /** Profile page (without locale). */
  path: string
  /** Service page (without locale) this specialist leads, if any. */
  leads?: string
  languages?: Array<string>
}

// Profiles and copy live in `src/lib/specialists.ts` and `specialists.people`.
export const SPECIALISTS: ReadonlyArray<ClinicSpecialist> = [
  {
    id: 'robbin',
    name: 'Dr. Robbin',
    jobTitle: 'Aesthetic, Cosmetic & Implant Dentistry',
    specialties: ['Dentistry'],
    path: 'specialists/dr-robbin',
    leads: 'services/dental',
    languages: ['Swedish', 'English', 'Persian', 'German', 'Lithuanian', 'Norwegian'],
  },
  {
    id: 'darina-sansasvili',
    name: 'Dr. Darina Sansasvili',
    jobTitle: 'Dentofacial Aesthetic Specialist',
    specialties: ['Dentistry'],
    path: 'specialists/dr-darina-sansasvili',
    languages: ['English', 'Czech', 'Italian', 'Russian', 'Spanish', 'Georgian'],
  },
  {
    id: 'bozana-krivosija',
    name: 'Dr. Bozana Krivošija',
    jobTitle: 'Aesthetic & Regenerative Medicine',
    specialties: [],
    path: 'specialists/dr-bozana-krivosija',
    leads: 'services/aesthetics',
    languages: ['English', 'Serbian', 'Spanish'],
  },
  {
    id: 'afshin-moheb',
    name: 'Dr. Afshin Moheb',
    jobTitle: 'Facial Plastic Surgery & Hair Restoration',
    specialties: ['PlasticSurgery'],
    path: 'specialists/dr-afshin-moheb',
    languages: ['English', 'German', 'Persian'],
  },
  {
    id: 'angelo-termini',
    name: 'Dr. Angelo Termini',
    jobTitle: 'General Medicine, General Surgery & Urology (MD, PhD)',
    specialties: ['PrimaryCare', 'Surgical', 'Urologic'],
    path: 'specialists/dr-angelo-termini',
    leads: 'services/general-medicine',
    languages: ['Swedish', 'English', 'Norwegian', 'Italian', 'Spanish'],
  },
  {
    id: 'behrouz-rajabi',
    name: 'Behrouz Rajabi',
    jobTitle: 'Yumeiho Therapeutic Massage Specialist',
    specialties: [],
    path: 'specialists/behrouz-rajabi',
    leads: 'services/massage-therapy',
    languages: ['Persian', 'German', 'English', 'Spanish'],
  },
]

/** Service pages, in navigation order. `key` matches `layout.navigation.items.treatments.*`. */
export const SERVICES = [
  {
    key: 'dental',
    path: 'services/dental',
    name: 'Dentistry',
    specialty: 'Dentistry',
    summary:
      'Implants, cosmetic dentistry, restorations and pain-free general dental care.',
  },
  {
    key: 'aesthetic',
    path: 'services/aesthetics',
    name: 'Aesthetic & Anti-Aging Medicine',
    specialty: null,
    summary:
      'Dermal fillers, neuromodulators, skin rejuvenation, PRP, polynucleotides, biostimulators, hair restoration and body contouring.',
  },
  {
    key: 'medical',
    path: 'services/general-medicine',
    name: 'General Medicine',
    specialty: 'PrimaryCare',
    summary:
      'English-speaking private doctor: check-ups and blood panels, minor surgery, urology, weight management and 24/7 urgent care.',
  },
  {
    key: 'massage',
    path: 'services/massage-therapy',
    name: 'Yumeiho Therapeutic Massage',
    specialty: null,
    summary:
      'Japanese Yumeiho technique for back tension, posture, joint mobility and sciatic discomfort.',
  },
] as const

export const EMERGENCY_SERVICE = {
  path: 'services/emergency',
  name: '24/7 Emergency Dental Care',
  summary:
    'Same-day emergency dentistry around the clock: severe toothache, broken teeth, lost crowns or fillings, abscesses and dental trauma.',
}
