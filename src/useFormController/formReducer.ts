/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import { FormState } from './types'
import { updateFieldSchema } from '../utils'
import { FormActions } from './formActions'

export const formReducer = <TForm>(
  state: FormState<TForm>,
  action: FormActions<TForm>
): FormState<TForm> => {
  switch (action.type) {
    case 'SET_VALUES':
      return {
        ...state,
        values: action.payload
      }

    case 'SET_VALUE':
      const values = updateFieldSchema(
        state.values,
        `${action.payload.field}`,
        action.payload.value
      )
      const touched = updateFieldSchema(
        state.touched,
        `${action.payload.field}`,
        true
      )
      return {
        ...state,
        values,
        touched
      }
    case 'SET_ERRORS':
      const errors = action.payload
      return {
        ...state,
        errors: (errors && { ...state.errors, ...errors }) || null
      }
    case 'SET_ERROR':
      return { ...state, errors: action.payload.error }
    case 'SET_PENDING':
      const pending = updateFieldSchema(
        state.pending,
        `${action.payload.field}`,
        action.payload.pending
      )
      return {
        ...state,
        pending
      }
    case 'IS_SUBMITTING':
      return { ...state, isSubmitting: action.payload }
    default:
      return state
  }
}
