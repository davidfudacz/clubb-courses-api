import React from 'react'
import Link from './link'
import { _parseCourseUrl, _parseCourseNameForDisplay } from '../../../utilities'

const CourseNameLink = (props) => {
  if (!props.course) throw new Error('CourseNameLink component requires a club object prop')
  const { isInformal, course } = props
  return (
    <Link to={_parseCourseUrl(props.course)}>{_parseCourseNameForDisplay(course, isInformal)}</Link>
  )
}

export default CourseNameLink
