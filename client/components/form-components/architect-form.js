import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import store, {
  postArchitectToServerThunkerator,
} from '../../store'
import {
  required,
  fourDigitYear,
} from './validations'

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} />
      { touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))
      }
    </div>
  </div>
)

const submit = async (values) => {
  console.log(values)
  await store.dispatch(postArchitectToServerThunkerator(values))
  console.log('success')
}

class ArchitectForm extends React.Component {
  constructor () {
    super()
    this.state = {
      errors: false,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    console.log('here')
    if (!nextProps.valid) {
      return {
        errors: true,
      }
    }
    else {
      return {
        errors: false,
      }
    }
  }

  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props
    return (
      <form>
        <div>
          <Field
            name="givenName"
            component={renderField}
            type="text"
            label="First Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="surname"
            component={renderField}
            type="text"
            label="Last Name"
            validate={required}
          />
        </div>
        <div>
          <Field
            name="birthYear"
            component={renderField}
            type="text"
            label="Year of Birth"
            validate={fourDigitYear}
          />
        </div>
        <div>
          <Field
            name="deathYear"
            component={renderField}
            type="text"
            label="Year of Death"
            validate={fourDigitYear}
          />
        </div>
        <div>
          <button  onClick={handleSubmit(submit)} type="submit" disabled={submitting || this.state.errors || pristine}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'architectForm',
})(ArchitectForm)
