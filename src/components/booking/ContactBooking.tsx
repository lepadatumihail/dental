import { BookingWizard } from './BookingWizard'

/** Inline booking wizard for the /contact page. */
export function ContactBooking() {
  return (
    <div className="rounded-3xl border border-mocha/10 bg-surface-100 p-6 shadow-[0_12px_32px_rgba(50,53,26,0.06)] sm:p-8">
      <BookingWizard variant="inline" />
    </div>
  )
}
