/* eslint-disable no-unused-vars */
import { FormActions } from './formActions'
export type Maybe<T> = T | null | undefined

export interface Action {
  type: string
  payload?: any
}

export type ValidationErrors = Maybe<{
  [key: string]: any
}>

export interface FormValidatorFunction<TForm> {
  (
    values: TForm,
    setPending: (field: keyof TForm | any) => (pending: boolean) => void
  ): Maybe<ValidationErrors>
}

export type FormStateKeys<TForm, T = any> = { [K in keyof TForm]: T }
export type FormStateErrors = Record<string, any>
export type FormStatePending<TForm> = FormStateKeys<TForm, boolean>
export type FormStateTouched<TForm> = FormStateKeys<TForm, boolean>
export type FormStateValueChanged<TForm> = FormStateKeys<TForm, boolean>

export interface FormInput<TForm> {
  initialValues: TForm
  validator?: FormValidatorFunction<TForm>
  handleSubmit?: (values: TForm) => Maybe<FormStateErrors>
  validateOnChange?: boolean
  validateOnMount?: boolean
}
export interface FormState<TForm> {
  values: TForm
  errors: Maybe<FormStateErrors>
  touched: FormStateTouched<TForm>
  pending: FormStatePending<TForm>
  isSubmitting: boolean
}

export interface FormController<TForm> extends FormState<TForm> {
  setValues: (values: TForm, shouldValidate?: boolean) => void
  setValue: (
    key: keyof TForm & string,
    value: TForm,
    validator: FormValidatorFunction<TForm>,
    shouldValidate?: boolean
  ) => void
  setErrors: (errors: FormStateErrors) => void
  setError: (field: keyof TForm, error: Maybe<ValidationErrors>) => void
  handleChange: (event: React.ChangeEvent<any>) => void
  hasValueChanged: FormStateValueChanged<TForm>
  onSubmit: (event: React.SyntheticEvent) => void
  isValid: boolean
}

export type UseFormReducer<TForm> = React.Reducer<
  FormState<TForm>,
  FormActions<TForm>
>
