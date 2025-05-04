'use server'

// Define the form state type
type FormState = {
  message: string
  success: boolean | null
}

/**
 * Server action to save appointment request to Google Sheets via API
 */
export async function submitAppointmentRequest(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    // Extract form data
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const date = formData.get('date') as string
    const reason = formData.get('reason') as string
    const service = formData.get('service') as string

    if (!name || !email || !phone || !date || !reason || !service) {
      return {
        success: false,
        message: 'Please fill out all required fields',
      }
    }

    // Determine the base URL - important for server actions
    // In server actions, we need an absolute URL, not a relative one
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://www.prismaclinicmarbella.es'

    // Log the base URL for debugging

    // Submit the data to the API endpoint with absolute URL
    const response = await fetch(`${baseUrl}/api/submit-appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        date,
        reason,
        service,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('API error:', result)
      return {
        success: false,
        message:
          result.message ||
          'There was an error submitting your request. Please try again.',
      }
    }

    // Return success response - this will trigger the form reset
    return {
      success: true,
      message:
        'Thank you! Your appointment request has been received. We will contact you shortly.',
    }
  } catch (error) {
    console.error('Error processing appointment request:', error)
    return {
      success: false,
      message: 'There was an error submitting your request. Please try again.',
    }
  }
}
