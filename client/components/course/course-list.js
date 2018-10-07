import React from 'react'
import TeeYardageWrapper from './tee-yardage-wrapper'
import BuildWrapper from './build-wrapper'
import { SubHeader, Link } from '../ui-elements';
import { _parseCourseNameForDisplay, _parseClubNameForDisplay, _parseClubUrl } from '../../utilities';

const CourseList = (props) => {
  const { club, courseToHighlight } = props
  let courses = club.courses ? club.courses : []
  if (courseToHighlight) {
    courses = courses.filter(course => {
      return course.id === +courseToHighlight
    })
  }
  return (
    <div>
      {
        courseToHighlight && club.name
          ? <Link to={_parseClubUrl(club)}>View all courses at {_parseClubNameForDisplay(club, true)}</Link>
          : null
      }
      {
        courses.map(course => {
          return (
            <div key={course.id}>
              {
                course.name
                  ? <SubHeader>{_parseCourseNameForDisplay(course, false, true)}</SubHeader>
                  : null
              }
              <BuildWrapper builds={course.builds} />
              <TeeYardageWrapper teeYardages={course.teeYardages} />
            </div>
          )
        })
      }
    </div>
  )
}

export default CourseList
