import React from 'react'
import { Header } from '../ui-elements'
import { _parseCourseNameForDisplay } from '../../utilities'

const CourseNameHeader = (props) => {
  if (!props.course) throw new Error('CourseNameHeader component requires a club object prop')
  const { isInformal, course } = props
  return (
    <Header>{_parseCourseNameForDisplay(course, isInformal)}</Header>
  )
}

export default CourseNameHeader
