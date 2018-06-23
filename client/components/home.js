/* eslint react/prefer-stateless-function: 0 */
import React from 'react'
import { connect } from 'react-redux'
import {
  ClubNameHeader,
  ClubNameLink,
  CourseNameHeader,
  CourseNameLink,
} from '../components'
import { _sortClubsAlphabetically, _sortCoursesAlphabetically } from '../utilities'

class Home extends React.Component {
  render () {
    return (
      <div>
        {
          _sortClubsAlphabetically(this.props.clubs).map(club => {
            return (
              <div key={club.id}>
              <ClubNameHeader
                club={club}
              />
              <ClubNameLink
                club={club}
              />
              </div>
            )
          })
        }
        <h1 style={{color: 'red'}}>Courses</h1>
        {
          _sortCoursesAlphabetically(this.props.courses).map(course => {
            return (
              <div key={course.id}>
              <CourseNameHeader
                course={course}
                isInformal={true}
              />
              <CourseNameLink
                course={course}
                isInformal={true}
              />
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = ({ clubs, courses }) => ({ clubs, courses })

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
