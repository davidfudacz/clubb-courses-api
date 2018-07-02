import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import {
  required,
  fourDigitYear,
} from '../validations'
import renderField from '../renderField'
import {
  getAllArchitectsFromServerThunkerator,
  clearArchitects,
 } from '../../../store'
 import {
   _sortArchitectsAlphabetically,
 } from '../../../utilities';
import { connect } from 'react-redux'


const renderArchitectSelector = ({ architects, fields, meta: { error, submitFailed }}) => {
  console.log(architects)
  return (
    <div>
      <h5>Who built it?</h5>
      {fields.map((architect, index) => (
        <div key={index}>
          <button
            type="button"
            title="Remove Architect"
            onClick={() => fields.remove(index)}>
              Remove Architect
          </button>
          <h5>Architect #{index + 1}</h5>
          <Field
            name={`${architect}.id`}
            component="select">
              <option value={null} />
              {architects}
          </Field>
        </div>
      ))}
      <div>
        <button type="button" onClick={() => fields.push({})}>Add Architect</button>
        {submitFailed && error && <span>{error}</span>}
      </div>
    </div>
  )
}

const renderCourseSelector = ({ architects, fields, meta: {error, submitFailed} }) => {
  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <button
            type="button"
            title="Remove Architect"
            onClick={() => fields.remove(index)}>
              Remove Course
          </button>
          <h5>Course #{index + 1}</h5>
          <Field
            name={`${field}.name`}
            component={renderField}
            type="text"
            label="What is the name of the course?"
            validate={[ required ]}
          />
          <Field
            name={`${field}.yearOriginallyBuilt`}
            component={renderField}
            type="text"
            label="What year was the course built?"
            validate={[ fourDigitYear, required ]}
          />
          <div>
            <label>Number of Holes</label><br />
            <Field
              name="numOfHoles"
              component="select"
              validate={required}
              >
                <option value={18}>18</option>
                <option value={9}>9</option>
            </Field>
          </div>
          <FieldArray name={`${field}.architects`} component={renderArchitectSelector} architects={architects} validate={required} />
        </div>
      ))}
      <div>
        <button type="button" onClick={() => fields.push({})}>Add Course</button>
        {submitFailed && error && <span>{error}</span>}
      </div>
    </div>
  )
}

class MultipleCourse extends React.Component {
  componentDidMount () {
    this.props.fetchArchitects()
  }

  componentWillUnmount () {
    this.props.clearArchitects()
  }

  render() {
    const { handleSubmit, architects } = this.props
    const architectsForSelect = architects ? _sortArchitectsAlphabetically(architects).map(({ id, givenName, surname }) => {
      return <option key={id} value={id}>{`${givenName} ${surname}`}</option>
    })
    : []
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name="courses" component={renderCourseSelector} architects={architectsForSelect} validate={required} />
        <div>
          <button type="submit" className="next">Next</button>
        </div>
      </form>
    )
  }
}

const mapState = ({ architects }) => ({ architects })

const mapDispatch = dispatch => ({
  fetchArchitects: () => {
    dispatch(getAllArchitectsFromServerThunkerator())
  },
  clearArchitects: () => {
    dispatch(clearArchitects())
  }
})

const MultipleCourseForm = reduxForm({
  form: 'wizardForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(MultipleCourse)

export default connect(mapState, mapDispatch)(MultipleCourseForm)
