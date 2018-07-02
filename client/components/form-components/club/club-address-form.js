
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {
  required,
} from '../validations'
import renderField from '../renderField'
import {
  getAllStatesFromServerThunkerator,
  clearStates,
 } from '../../../store'
import { connect } from 'react-redux'

const renderStateSelector = ({ states, input, meta: {touched, error} }) => {
  return (
    <div>
      <select {...input}>
        <option value="">Select a state...</option>
        {states.map(({ id, abbreviation }) => <option value={id} key={id}>{abbreviation}</option>)}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  )
}

class ClubAddress extends React.Component {
  componentDidMount () {
    this.props.fetchStates()
  }

  componentWillUnmount () {
    this.props.clearStates()
  }

  render() {
    const { handleSubmit, states } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <label>What is the address of the club?</label>
        <Field
          name="street"
          type="text"
          component={renderField}
          label="Address Line 1"
          validate={required}
        />
        <Field
          name="city"
          component={renderField}
          type="text"
          label="City"
          validate={required}
        />
        <div>
          <label>State</label>
          <Field
            name="state"
            component={renderStateSelector}
            states={states}
            validate={required}
          />
        </div>
        <Field
          name="zip"
          component={renderField}
          type="text"
          label="Zip Code"
          validate={required}
        />
        <div>
          <button type="submit" className="next">Next</button>
        </div>
      </form>
    )
  }
}

const mapState = ({ states }) => ({ states })

const mapDispatch = dispatch => ({
  fetchStates: () => {
    dispatch(getAllStatesFromServerThunkerator())
  },
  clearStates: () => {
    dispatch(clearStates())
  }
})

const ClubAddressForm = reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ClubAddress)

export default connect(mapState, mapDispatch)(ClubAddressForm)
