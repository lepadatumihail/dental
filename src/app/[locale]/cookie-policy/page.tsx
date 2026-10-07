import { LegalPage, legalMetadata } from '@/components/LegalPage'
import { LOCALES } from '@/lib/locales'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }) {
  return legalMetadata(params.locale, 'cookies')
}

export default function Page() {
  return <LegalPage page="cookies" />
}
