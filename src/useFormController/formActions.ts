/* eslint-disable no-unused-vars */
import { Maybe, ValidationErrors, FormStateErrors, Action } from './types'

export type FormActionTypes<TForm> =
  | {
      type: 'SET_VALUES'
      payload: TForm
    }
  | {
      type: 'SET_VALUE'
      payload: { field: keyof TForm; value: any }
    }
  | {
      type: 'SET_ERRORS'
      payload: FormStateErrors
    }
  | {
      type: 'SET_ERROR'
      payload: { field: keyof TForm; error: Maybe<ValidationErrors> }
    }
  | {
      type: 'SET_PENDING'
      payload: { field: keyof TForm; pending: boolean }
    }
  | {
      type: 'IS_SUBMITTING'
      payload: boolean
    }
  | {
      type: 'SET_FORM_VALIDATING'
      payload: boolean
    }
  | {
      type: 'SET_FORM_ERRORS'
      payload: Maybe<ValidationErrors>
    }

export type FormActions<TForm> = FormActionTypes<TForm> & Action
