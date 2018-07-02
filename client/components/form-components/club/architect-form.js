import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import {
  postArchitectFormToServerThunkerator,
  clearArchitectForm,
} from '../../../store'
import {
  required,
  fourDigitYear,
} from '../validations'

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

class Architect extends React.Component {
  constructor () {
    super()
    this.state = {
      errors: false,
      submitMessageVisible: false,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    let newState = {}
    if (nextProps.architect.id) {
      newState = {
        ...newState,
        submitMessageVisible: true,
      }
    }
    if (!nextProps.architect.id) {
      newState = {
        ...newState,
        submitMessageVisible: false,
      }
    }
    if (!nextProps.valid) {
      newState = {
        ...newState,
        errors: true,
      }
    }
    if (nextProps.valid) {
      newState = {
        ...newState,
        errors: false,
      }
    }
    return newState
  }

  render () {
    const { handleSubmit, pristine, submitting, architect, clearSubmitMessage } = this.props
    return (
      <div>
        {
          this.state.submitMessageVisible
          ? <span onClick={clearSubmitMessage}>You submitted {architect.givenName} {architect.surname}</span>
          : null
        }
        <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={submitting || this.state.errors || pristine}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
      </div>
    )
  }
}
const mapState = ({ forms }) => ({
  architect: forms.architect
})

const mapDispatch = dispatch => ({
  onSubmit: (values) => {
    dispatch(postArchitectFormToServerThunkerator(values))
  },
  clearSubmitMessage: () => {
    dispatch(clearArchitectForm())
  }
})

const submitSuccess = (result, dispatch) => {
  dispatch(reset('architectForm'))
}

const ArchitectForm = reduxForm({
  form: 'architectForm',
  onSubmitSuccess: submitSuccess,
})(Architect)

export default connect(mapState, mapDispatch)(ArchitectForm)
