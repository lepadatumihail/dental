'use client'

import { usePathname } from 'next/navigation'

import { Footer } from '@/components/Footer'
import { SiteHeader } from '@/components/SiteHeader'
import { WhatsAppWidget } from '@/components/WhatsAppWidget'

export function RootLayout({ children }: { children: React.ReactNode }) {
  // Remount the header on navigation so the mobile menu closes.
  const pathname = usePathname()

  return (
    <>
      <SiteHeader key={pathname} />
      <main className="w-full flex-auto">{children}</main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
