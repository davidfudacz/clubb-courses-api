import React from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.surname) {
    errors.surname = 'Required'
  }
  if (values.birthYear && isNaN(Number(values.birthYear))) {
    errors.birthYear = 'Must be a 4 digit number'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      { touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))
      }
    </div>
  </div>
)

const ArchitectForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component={renderField} type="text" />
      </div>
      <div>
        <label htmlFor="surname">Last Name</label>
        <Field name="surname" component={renderField} type="text" />
      </div>
      <div>
        <label htmlFor="birthYear">Year of Birth</label>
        <Field name="birthYear" component={renderField} type="text" />
      </div>
      <div>
        <label htmlFor="deathYear">Year of Death</label>
        <Field name="deathYear" component={renderField} type="text" />
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'architectForm',
  validate,
})(ArchitectForm)
