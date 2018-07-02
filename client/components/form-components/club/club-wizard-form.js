
import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ClubForm from './club-form'
import ClubAddressForm from './club-address-form'
import OneCourseForm from './one-course-form'
import MultipleCourseForm from './multiple-course-form'

const HowManyCourses = (props) => {
  return (
    <div>
      <h5>Does this club have multiple golf courses?</h5>
      <div>
        <button onClick={props.yes}>Yes</button>
        <button onClick={props.no}>No</button>
      </div>
    </div>
  )
}

class ClubWizardForm extends Component {
 constructor(props) {
   super(props)
   this.state = {
     page: 3,
   }
 }
 nextPage = () => {
   this.setState({page: this.state.page + 1})
 }

 previousPage = () => {
   this.setState({page: this.state.page - 1})
 }

 oneCourse = () => {
   this.setState({ page: 4 })
 }

 multipleCourses = () => {
   this.setState({ page: 5 })
 }

 skipPage = () => {
   this.setState({ page: this.state.page + 2 })
 }

 render() {
   const { onSubmit } = this.props
   const { page } = this.state
   return (
     <div>
       {page === 1 && <ClubForm onSubmit={this.nextPage} />}
       {page === 2 &&
         <ClubAddressForm
           previousPage={this.previousPage}
           onSubmit={this.nextPage}
         />}
       {page === 3 &&
         <HowManyCourses
           yes={this.multipleCourses}
           no={this.oneCourse}
         />}
       {page === 4 &&
         <OneCourseForm
           previousPage={this.previousPage}
           onSubmit={this.skipPage}
         />}
       {page === 5 &&
         <MultipleCourseForm
           previousPage={this.previousPage}
           onSubmit={this.skipPage}
         />}
     </div>
   )
 }
}

const mapState = null

const mapDispatch = dispatch => ({
  onSubmit: values => {
    console.log(values)
  }
})

ClubWizardForm.propTypes = {
 onSubmit: PropTypes.func.isRequired
}

export default connect(mapState, mapDispatch)(ClubWizardForm)
