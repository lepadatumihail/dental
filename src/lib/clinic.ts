// Facts about the clinic shared by the footer, JSON-LD and llms.txt. Keep them
// in sync with the copy in `locales/*.json`.

export const CLINIC_PHONE = '+34 673 290 786'
export const CLINIC_PHONE_E164 = '+34673290786'
export const WHATSAPP_URL = `https://wa.me/${CLINIC_PHONE_E164}`

export const SOCIAL_PROFILES = [
  'https://www.facebook.com/p/Prisma-Clinic-Marbella-61577789463482/',
  'https://www.instagram.com/prismaclinicmarbella/',
]

// Spoken by the team (see `home.whatsapp.description`).
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
  /** Page (without locale) where the specialist is presented. */
  path: string
  languages?: Array<string>
}

export const SPECIALISTS: ReadonlyArray<ClinicSpecialist> = [
  {
    id: 'angelo-termini',
    name: 'Dr. Angelo Termini',
    jobTitle: 'General Medicine, General Surgery & Urology (MD, PhD)',
    specialties: ['PrimaryCare', 'Surgical', 'Urologic'],
    path: 'services/general-medicine',
  },
  {
    id: 'bozana-krivosija',
    name: 'Dr. Bozana Krivošija',
    jobTitle: 'Aesthetic & Anti-Aging Medicine',
    specialties: [],
    path: 'services/aesthetics',
    languages: ['Serbian', 'Spanish', 'English'],
  },
  {
    id: 'robbin',
    name: 'Dr. Robbin',
    jobTitle: 'Dental Surgeon & Cosmetic Dentistry',
    specialties: ['Dentistry'],
    path: 'services/dental',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'behrouz-rajabi',
    name: 'Behrouz Rajabi',
    jobTitle: 'Yumeiho Therapeutic Massage Specialist',
    specialties: [],
    path: 'services/massage-therapy',
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
