import { BookingWizard } from './BookingWizard'

/** Inline booking wizard for the /contact page. */
export function ContactBooking() {
  return (
    <div className="border border-line bg-white p-6 sm:p-10">
      <BookingWizard variant="inline" />
    </div>
  )
}
