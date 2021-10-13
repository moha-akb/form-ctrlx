/* eslint-disable no-unused-vars */
import React from 'react'
import { formReducer } from './formReducer'
import {
  Maybe,
  ValidationErrors,
  FormInput,
  FormStatePending,
  FormStateTouched,
  FormController,
  UseFormReducer,
  FormValidatorFunction
} from './types'
import { validateValues } from './validation'
import { updateFieldSchema, deepEqual, isValueChanged } from '../utils'

export const useFormController = <TForm>({
  initialValues,
  validators,
  handleSubmit,
  validateOnMount = false,
  validateOnChange = true
}: FormInput<TForm>): FormController<TForm> => {
  const [state, dispatch] = React.useReducer<UseFormReducer<TForm>>(
    formReducer,
    {
      values: initialValues,
      errors: null,
      touched: {} as FormStateTouched<TForm>,
      pending: {} as FormStatePending<TForm>,
      isSubmitting: false
    }
  )
  const setErrors = (errors: Maybe<ValidationErrors>) => {
    dispatch({ type: 'SET_ERRORS', payload: errors })
  }
  const setError = (field: keyof TForm, error: ValidationErrors | null) => {
    dispatch({ type: 'SET_ERROR', payload: { field, error } })
  }
  const setPending = (field: keyof TForm) => (pending: boolean) => {
    dispatch({ type: 'SET_PENDING', payload: { field, pending } })
  }

  const setIsSubmitting = (isSubmitting: boolean): void => {
    dispatch({ type: 'IS_SUBMITTING', payload: isSubmitting })
  }

  React.useEffect(() => {
    if (validators && validateOnMount) {
      validateValues(validators, initialValues, setPending).then((errors) => {
        if (errors) {
          setErrors(errors)
        }
        return errors
      })
    }
  }, [])
  const setValue = (
    field: keyof TForm & string,
    value: TForm,
    validator?: FormValidatorFunction<TForm>,
    shouldValidate: boolean = validateOnChange
  ): void => {
    const intermediateState = updateFieldSchema(state.values, field, value)
    dispatch({ type: 'SET_VALUE', payload: { field, value } })
    if (shouldValidate && validator) {
      validateValues(validator, intermediateState, setPending).then(
        (errors) => {
          if (!deepEqual(state.errors, errors)) {
            setErrors(errors)
          }
          return errors
        }
      )
    }
  }
  const setValues = (
    values: TForm,
    shouldValidate: boolean = validateOnChange
  ): void => {
    dispatch({ type: 'SET_VALUE', payload: values })
    if (shouldValidate && validators) {
      validateValues(validators, values, setPending)
    }
  }
  const handleChange = (event: React.ChangeEvent<any>): void => {
    let { type, id, name, value } = event.target
    const field = name || id

    if (type === 'number') {
      value = parseFloat(value)
    } else if (type === 'checkbox') {
      value = event.target.checked
    }
    setValue(field, value, validators)
  }
  const hasValueChanged = isValueChanged(state.values, initialValues)

  const isValid = React.useMemo(() => {
    if (!state.errors) return true
    const fieldErrorKeys = Object.keys(state.errors)
    if (fieldErrorKeys.length > 0) {
      for (const field in state.errors) {
        if (state.errors[field]) {
          return false
        }
      }
    }
    return true
  }, [state.errors])
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (isValid && handleSubmit) {
      setIsSubmitting(true)
      Promise.resolve(handleSubmit(state.values))
        .then((errors) => {
          if (!deepEqual(errors, state.errors)) {
            setErrors(errors)
          }
        })
        .catch((errors) => {
          if (!deepEqual(errors, state.errors)) {
            setErrors(errors)
          }
        })
        .finally(() => {
          setIsSubmitting(false)
        })
    }
  }
  return {
    ...state,
    handleChange,
    hasValueChanged,
    isValid,
    setValue,
    setValues,
    setError,
    onSubmit,
    setErrors
  }
}
