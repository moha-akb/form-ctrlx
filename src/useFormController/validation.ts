/* eslint-disable no-unused-vars */
import { Maybe, ValidationErrors, FormValidatorFunction } from './types'

export const validating = <TForm>(
  validator: FormValidatorFunction<TForm>,
  values: TForm,
  setPending: any
): Promise<Maybe<ValidationErrors>> => {
  return Promise.resolve(validator(values, setPending))
}
export const validateValues = async <TForm>(
  validator: FormValidatorFunction<TForm>,
  values: TForm,
  setPending: any
): Promise<Maybe<ValidationErrors>> => {
  return await validating(validator, values, setPending)
}
