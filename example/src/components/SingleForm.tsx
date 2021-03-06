import React from 'react';
import { useFormController } from 'form-ctrlx'
import { ValidationErrors } from '../../../src/useFormController/types'
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type SignUpFormType = {
  email: string
  username: string
  password: string
  confirmPassword: string
  termsAndConditions: boolean
}
export const SingleForm = () => {
    const handleSubmit = (values: SignUpFormType) => {
        console.log('ONSUBMIT', values)
        return null
      }
      const signupForm = useFormController<SignUpFormType>({
        initialValues: {
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
          termsAndConditions: false
        },
        validateOnMount: true,
        validateOnChange: true,
        handleSubmit: handleSubmit,
        validators: async (values) => {
          let errors: ValidationErrors = {}
          if (values.confirmPassword !== values.password) {
            errors['mismatch'] = true
          }
          if (Object.keys(errors).length === 0) {
            return null
          }
          return errors
        }
      })
    
      return (
        <div
          style={{
            padding: '20px 40px'
          }}
        >
          <h2>Sign up Form</h2>
          <form onSubmit={signupForm.onSubmit}>
            <div className='form-group'>
              <label className='form-label'>Email</label>
              <input
                type='text'
                name='email'
                id='email'
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                value={signupForm.values.username}
                onChange={signupForm.handleChange}
              />
            </div>
            <div className='form-group'>
              <label className='form-label'>Password</label>
              <input
                type='password'
                name='password'
                id='password'
                value={signupForm.values.password}
                onChange={signupForm.handleChange}
              />
            </div>
    
            <div className='form-group'>
              <label className='form-label'>Confirm Password</label>
              <input
                type='password'
                name='confirmPassword'
                id='confirmPassword'
                value={signupForm.values.confirmPassword}
                onChange={signupForm.handleChange}
              />
            </div>
    
            <div className='form-group'>
              <label className='form-label'>Terms and conditions</label>
              <input
                type='checkbox'
                name='termsAndConditions'
                id='termsAndConditions'
                onChange={signupForm.handleChange}
                checked={signupForm.values.termsAndConditions}
              />
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      )
}