// State, actions and reducer for the multi-step booking wizard.

import { EVENT_TYPES, isKnownEventType } from '@/lib/agenda/event-types'
import type {
  AvailabilityResponse,
  BookingSuccess,
  NormalizedError,
} from '@/lib/agenda/types'

export type WizardStep =
  | 'service'
  | 'datetime'
  | 'location'
  | 'details'
  | 'confirm'
  | 'success'

export type ClientField =
  | 'clientName'
  | 'clientEmail'
  | 'clientPhone'
  | 'clientAddress'
  | 'clientZipCode'
  | 'notes'

export type AvailabilityStatus = 'idle' | 'loading' | 'ready' | 'error'

export interface WizardState {
  step: WizardStep
  eventTypeId: string | null
  /** Bumped to force an availability re-fetch (recovery / retry). */
  reloadKey: number
  availability: AvailabilityResponse | null
  availabilityStatus: AvailabilityStatus
  selectedDate: string | null
  selectedTime: string | null
  selectedAddressAlias: string | null
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  clientZipCode: string
  notes: string
  submitting: boolean
  error: NormalizedError | null
  fieldErrors: Partial<Record<string, string>>
  success: BookingSuccess | null
}

export type WizardAction =
  | { type: 'select_service'; eventTypeId: string }
  | { type: 'availability_loaded'; data: AvailabilityResponse }
  | { type: 'availability_error'; error: NormalizedError }
  | { type: 'retry_availability' }
  | { type: 'select_date'; date: string }
  | { type: 'select_time'; time: string }
  | { type: 'select_address'; alias: string }
  | { type: 'set_field'; field: ClientField; value: string }
  | { type: 'go_next'; step: WizardStep }
  | { type: 'go_back'; step: WizardStep }
  | { type: 'invalid'; fieldErrors: Partial<Record<string, string>> }
  | { type: 'submit_start' }
  | { type: 'submit_success'; data: BookingSuccess }
  | { type: 'submit_error'; error: NormalizedError; step?: WizardStep }
  | { type: 'recover'; error: NormalizedError }
  | { type: 'dismiss_error' }
  | { type: 'reset' }

/** The service-picker step is shown only when there is more than one option. */
export function canPickService(): boolean {
  return EVENT_TYPES.length > 1
}

export function createInitialState(
  initialEventTypeId: string | null,
): WizardState {
  const fixed =
    initialEventTypeId && isKnownEventType(initialEventTypeId)
      ? initialEventTypeId
      : null
  const soleEventType = EVENT_TYPES.length === 1 ? EVENT_TYPES[0].id : null
  const eventTypeId = fixed ?? soleEventType

  return {
    step: eventTypeId ? 'datetime' : 'service',
    eventTypeId,
    reloadKey: 0,
    availability: null,
    availabilityStatus: eventTypeId ? 'loading' : 'idle',
    selectedDate: null,
    selectedTime: null,
    selectedAddressAlias: null,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    clientZipCode: '',
    notes: '',
    submitting: false,
    error: null,
    fieldErrors: {},
    success: null,
  }
}

export function wizardReducer(
  state: WizardState,
  action: WizardAction,
): WizardState {
  switch (action.type) {
    case 'select_service': {
      // Re-selecting the same service keeps its already-fetched availability.
      if (action.eventTypeId === state.eventTypeId) {
        return { ...state, step: 'datetime', error: null, fieldErrors: {} }
      }
      return {
        ...state,
        eventTypeId: action.eventTypeId,
        step: 'datetime',
        availability: null,
        availabilityStatus: 'loading',
        selectedDate: null,
        selectedTime: null,
        selectedAddressAlias: null,
        error: null,
        fieldErrors: {},
      }
    }

    case 'availability_loaded': {
      const { data } = action
      const dateValid =
        !!state.selectedDate &&
        data.availableDates.includes(state.selectedDate)
      const selectedDate = dateValid ? state.selectedDate : null
      const timeValid =
        !!selectedDate &&
        !!state.selectedTime &&
        (data.slotsByDate[selectedDate] ?? []).includes(state.selectedTime)
      // Auto-select the only address for a predefined single-location event.
      const soleAlias =
        data.locationType === 'predefined' && data.addresses?.length === 1
          ? data.addresses[0].alias
          : state.selectedAddressAlias
      return {
        ...state,
        availability: data,
        availabilityStatus: 'ready',
        selectedDate,
        selectedTime: timeValid ? state.selectedTime : null,
        selectedAddressAlias: soleAlias ?? null,
      }
    }

    case 'availability_error':
      return {
        ...state,
        availability: null,
        availabilityStatus: 'error',
        error: action.error,
      }

    case 'retry_availability':
      return {
        ...state,
        availability: null,
        availabilityStatus: 'loading',
        error: null,
        reloadKey: state.reloadKey + 1,
      }

    case 'select_date':
      return {
        ...state,
        selectedDate: action.date,
        selectedTime: null,
        fieldErrors: {},
      }

    case 'select_time':
      return { ...state, selectedTime: action.time, fieldErrors: {} }

    case 'select_address':
      return { ...state, selectedAddressAlias: action.alias, fieldErrors: {} }

    case 'set_field':
      return {
        ...state,
        [action.field]: action.value,
        fieldErrors: { ...state.fieldErrors, [action.field]: undefined },
      }

    case 'go_next':
    case 'go_back':
      return { ...state, step: action.step, error: null, fieldErrors: {} }

    case 'invalid':
      return { ...state, fieldErrors: action.fieldErrors }

    case 'submit_start':
      return { ...state, submitting: true, error: null }

    case 'submit_success':
      return {
        ...state,
        submitting: false,
        step: 'success',
        success: action.data,
        error: null,
      }

    case 'submit_error':
      return {
        ...state,
        submitting: false,
        error: action.error,
        step: action.step ?? state.step,
      }

    case 'recover':
      // Token expired / slot taken: re-fetch availability and rewind so the
      // user re-picks a slot (which yields a fresh token).
      return {
        ...state,
        submitting: false,
        step: 'datetime',
        availability: null,
        availabilityStatus: 'loading',
        selectedTime: null,
        reloadKey: state.reloadKey + 1,
        error: action.error,
      }

    case 'dismiss_error':
      return { ...state, error: null }

    case 'reset':
      return createInitialState(null)

    default:
      return state
  }
}
