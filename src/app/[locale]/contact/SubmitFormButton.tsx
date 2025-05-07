'use client'

import { useFormStatus, useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import { submitAppointmentRequest } from '@/app/actions'
import { Button } from '@/components/Button'

// Define the form state type (should match the one in actions.ts)
type FormState = {
  message: string
  success: boolean | null
}

// Initial state for the form
const initialState: FormState = {
  message: '',
  success: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="mt-10" disabled={pending}>
      {pending ? 'Submitting...' : 'Request Appointment'}
    </Button>
  )
}

export function AppointmentForm({ children }: { children: React.ReactNode }) {
  const [state, formAction] = useFormState(
    submitAppointmentRequest,
    initialState,
  )
  const formRef = useRef<HTMLFormElement>(null)

  // Reset the form when submission is successful
  useEffect(() => {
    if (state.success) {
      // Wait a moment to give user time to see the success message before resetting
      const timer = setTimeout(() => {
        if (formRef.current) {
          formRef.current.reset()
        }
      }, 3000) // Reset after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [state.success])

  return (
    <form ref={formRef} action={formAction}>
      {children}

      {state.message && (
        <div
          className={`mt-4 rounded-md p-4 ${
            state.success
              ? 'border border-green-200 bg-green-50 text-green-700'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {state.message}
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
