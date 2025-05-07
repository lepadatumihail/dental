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

    // Instead of using fetch with absolute URLs, directly call the API endpoint handler
    // This avoids URL resolution issues on the server
    try {
      // Import the API handler directly to call it
      const { POST } = await import('./[locale]/api/submit-appointment/route')

      // Create a Request object with the form data
      const request = new Request(
        'https://www.prismaclinicmarbella.es/api/submit-appointment',
        {
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
        },
      )

      // Call the API handler directly
      const response = await POST(request)

      // Parse the JSON from the response
      const result = await response.json()

      return {
        success: true,
        message:
          result.message ||
          'Your appointment request has been received. We will contact you shortly.',
      }
    } catch (error) {
      console.error('Error processing appointment request:', error)
      return {
        success: false,
        message:
          'There was an error submitting your request. Please try again.',
      }
    }
  } catch (error) {
    console.error('Error processing appointment request:', error)
    return {
      success: false,
      message: 'There was an error submitting your request. Please try again.',
    }
  }
}
