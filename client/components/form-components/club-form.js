import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import {
  postClubFormToServerThunkerator,
  clearClubForm,
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

class Club extends React.Component {
  constructor () {
    super()
    this.state = {
      errors: false,
      submitMessageVisible: false,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    let newState = {}
    if (nextProps.club.id) {
      newState = {
        ...newState,
        submitMessageVisible: true,
      }
    }
    if (!nextProps.club.id) {
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
    const { handleSubmit, pristine, submitting, club, clearSubmitMessage } = this.props
    return (
      <div>
        {
          this.state.submitMessageVisible
          ? <span onClick={clearSubmitMessage}>You submitted {club.name}</span>
          : null
        }
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
              component={renderField}
              type="text"
              label="Club Name"
              validate={required}
            />
          </div>
          <div>
            <Field
              name="informal"
              component={renderField}
              type="text"
              label="Informal Name"
              validate={required}
            />
          </div>
          <div>
            <Field
              name="established"
              component={renderField}
              type="text"
              label="Year Established"
              validate={[ fourDigitYear, required ]}
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
  club: forms.club
})

const mapDispatch = dispatch => ({
  onSubmit: (values) => {
    dispatch(postClubFormToServerThunkerator(values))
  },
  clearSubmitMessage: () => {
    dispatch(clearClubForm())
  }
})

const submitSuccess = (result, dispatch) => {
  dispatch(reset('clubForm'))
}

const ClubForm = reduxForm({
  form: 'clubForm',
  onSubmitSuccess: submitSuccess,
})(Club)

export default connect(mapState, mapDispatch)(ClubForm)
