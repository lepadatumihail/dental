import { Playfair_Display, Raleway } from 'next/font/google'

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-raleway',
})

// Variable font: one file per style covers every weight.
export const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})
