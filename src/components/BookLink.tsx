import { useTranslations } from 'next-intl'

import { whatsappLink } from '@/lib/clinic'

/** Treatment areas with their own booking message under `site.bookMessage`. */
export type BookingTopic = 'dental' | 'aesthetics' | 'medical' | 'massage'

/**
 * Booking CTA. Appointments are arranged over WhatsApp, so this opens the
 * clinic's chat with the message already written; `service` or `specialist`
 * make it specific. Bring your own classes (e.g. `button dark`).
 */
export function BookLink({
  service,
  specialist,
  className,
  children,
  onClick,
}: {
  service?: BookingTopic
  /** Specialist's name as it should read in the message; wins over `service`. */
  specialist?: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const t = useTranslations('site.bookMessage')
  const message = specialist
    ? t('specialist', { name: specialist })
    : t(service ?? 'general')

  return (
    <a
      className={className}
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  )
}
