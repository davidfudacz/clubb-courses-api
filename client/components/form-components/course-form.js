import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset, FieldArray } from 'redux-form'
import {
  postCourseFormToServerThunkerator,
  clearCourseForm,
  getAllClubsFromServerThunkerator,
  getAllArchitectsFromServerThunkerator,
} from '../../store'
import {
  required,
  fourDigitYear,
} from './validations'
import {
  _sortClubsAlphabetically,
  _sortArchitectsAlphabetically,
} from '../../utilities';

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

const renderArchitects = ({ architects, fields, meta: { error, submitFailed }}) => {
  return (
    <div>
      <div>
        <button type="button" onClick={() => fields.push({})}>Add Architect</button>
        {submitFailed && error && <span>{error}</span>}
      </div>
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
    </div>
  )
}

class Course extends React.Component {
  constructor () {
    super()
    this.state = {
      errors: false,
      submitMessageVisible: false,
      selectedClubId: null,
    }
  }

  componentDidMount () {
    this.props.start()
  }

  static getDerivedStateFromProps(nextProps) {
    let newState = {}
    if (nextProps.course.id) {
      newState = {
        ...newState,
        submitMessageVisible: true,
      }
    }
    if (!nextProps.course.id) {
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

  handleSelectChange = (selectedClubId) => {
    this.setState({ selectedClubId })
  }

  render () {
    const {
      clubs,
      architects,
      handleSubmit,
      pristine,
      submitting,
      course,
      clearSubmitMessage
    } = this.props
    const clubsForSelect = clubs ? _sortClubsAlphabetically(clubs).map(({ id, name }) => {
      return <option key={id} value={id}>{name}</option>
    })
    : []
    const architectsForSelect = architects ? _sortArchitectsAlphabetically(architects).map(({ id, givenName, surname }) => {
      return <option key={id} value={id}>{`${givenName} ${surname}`}</option>
    })
    : []

    return (
      <div>
        {
          this.state.submitMessageVisible
          ? <span onClick={clearSubmitMessage}>You submitted {course.name}</span>
          : null
        }
        <form onSubmit={handleSubmit}>
          <div>
            <label>Club</label><br />
            <Field
              name="clubId"
              component="select">
                <option value={null} />
                {clubsForSelect}
            </Field>
          </div>
          <div>
            <Field
              name="name"
              component={renderField}
              type="text"
              label="Course Name"
            />
          </div>
          <div>
            <Field
              name="informal"
              component={renderField}
              type="text"
              label="Informal Name"
            />
          </div>
          <div>
            <Field
              name="year"
              component={renderField}
              type="text"
              label="Year Originally Built"
              validate={[ fourDigitYear, required ]}
            />
          </div>
          <div>
            <label>Number of Holes</label><br />
            <Field
              name="numOfHoles"
              component="select">
                <option value={null} />
                <option value={9}>9</option>
                <option value={18}>18</option>
            </Field>
          </div>
          <FieldArray name="architects" component={renderArchitects} architects={architectsForSelect} />
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
const mapState = ({ forms, clubs, architects }) => ({
  course: forms.course,
  clubs,
  architects,
})

const mapDispatch = dispatch => ({
  onSubmit: (values) => {
    console.log(values)
    dispatch(postCourseFormToServerThunkerator(values))
  },
  clearSubmitMessage: () => {
    dispatch(clearCourseForm())
  },
  start: () => {
    dispatch(getAllClubsFromServerThunkerator())
    dispatch(getAllArchitectsFromServerThunkerator())
  }
})

const submitSuccess = (result, dispatch) => {
  dispatch(reset('courseForm'))
}

const CourseForm = reduxForm({
  form: 'courseForm',
  onSubmitSuccess: submitSuccess,
})(Course)

export default connect(mapState, mapDispatch)(CourseForm)
