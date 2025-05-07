import { NextResponse } from 'next/server'
import { google } from 'googleapis'

interface GoogleAPIError {
  response?: {
    status?: number
    data?: {
      error?: {
        message?: string
        status?: string
        errors?: Array<{
          domain?: string
          reason?: string
          message?: string
        }>
      }
    }
  }
  message?: string
}

// Properly format the private key
const formatPrivateKey = (key: string | undefined): string | undefined => {
  if (!key) return undefined
  // If the key doesn't start with -----BEGIN PRIVATE KEY-----, it may need fixing
  if (!key.includes('-----BEGIN PRIVATE KEY-----')) {
    // Try to fix the key by properly formatting each line
    return key.replace(/\\n/g, '\n')
  }
  return key
}

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })
const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID || '1NGQsk0z9vKSOurPdNQ5BW2cC-OmcZSfyGtdvQOgejDQ'

// For testing purposes - if we don't have credentials, we'll log instead of using sheets API
const hasSheetsCredentials =
  process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY

export async function POST(request: Request) {
  try {
    console.log('API route called with request:', request.url)
    const data = await request.json()
    console.log('Received data:', data)

    const { name, email, phone, date, reason, service } = data

    // Create a timestamp for when the appointment was submitted
    const timestamp = new Date().toISOString()

    // If we don't have credentials, just log the data and return success
    if (!hasSheetsCredentials) {
      console.log(
        'No Google Sheets credentials found. In production, this would be saved to Google Sheets.',
      )
      console.log('Appointment data:', {
        timestamp,
        name,
        email,
        phone,
        date,
        reason,
        service,
        status: 'New',
      })

      return NextResponse.json({
        success: true,
        message:
          'Appointment request received. We will contact you shortly. (DEMO MODE)',
      })
    }

    if (!SPREADSHEET_ID) {
      throw new Error('GOOGLE_SHEET_ID is not configured')
    }

    // Prepare the values to be inserted - match exact spreadsheet column order
    const values = [
      [
        timestamp, // Column A: Timestamp
        name, // Column B: Name
        email, // Column C: Email
        phone, // Column D: Phone
        date, // Column E: Preferred Date
        reason, // Column F: Reason for Visit
        service, // Column G: Service Type
        'New', // Column H: Status (default to 'New')
      ],
    ]

    try {
      // First, try to get the spreadsheet metadata to verify access
      await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      })
    } catch (error) {
      const apiError = error as GoogleAPIError
      if (apiError?.response?.status === 404) {
        throw new Error(
          'Spreadsheet not found. Please check the GOOGLE_SHEET_ID and make sure the service account has access.',
        )
      }
      if (apiError?.response?.data?.error?.message?.includes('permission')) {
        console.error('Permission error details:', {
          email: process.env.GOOGLE_CLIENT_EMAIL,
          spreadsheetId: SPREADSHEET_ID,
          error: apiError.response.data.error,
        })
        throw new Error(
          `Permission denied. Please make sure the service account (${process.env.GOOGLE_CLIENT_EMAIL}) has editor access to the spreadsheet.`,
        )
      }
      throw error
    }

    try {
      // Append the data to the sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Appointments', // Sheet name from Google Sheets
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values,
        },
      })
    } catch (error) {
      const apiError = error as GoogleAPIError
      if (
        apiError?.response?.data?.error?.message?.includes(
          'Unable to parse range',
        )
      ) {
        // If there's an error with the sheet name, try to create the sheet
        const spreadsheet = await sheets.spreadsheets.get({
          spreadsheetId: SPREADSHEET_ID,
        })

        // Add a new sheet named "Appointments"
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: 'Appointments',
                  },
                },
              },
            ],
          },
        })

        // Add headers to the new sheet
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Appointments!A1',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                'Timestamp',
                'Name',
                'Email',
                'Phone',
                'Preferred Date',
                'Reason for Visit',
                'Service Type',
                'Status',
              ],
            ],
          },
        })

        // Now try to append the data again
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: 'Appointments',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values,
          },
        })
      } else {
        throw error
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment request received. We will contact you shortly.',
    })
  } catch (error) {
    const apiError = error as GoogleAPIError
    console.error('Error submitting appointment:', {
      message: apiError?.message || error,
      details: apiError?.response?.data?.error,
    })

    let errorMessage = apiError?.message || 'Failed to submit appointment'
    if (apiError?.response?.data?.error?.message) {
      errorMessage = apiError.response.data.error.message
    }

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 },
    )
  }
}
