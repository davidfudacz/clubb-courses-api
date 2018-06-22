import React from 'react'
import { Link } from '../ui-elements'
import { _parseCourseUrl } from '../../utilities'

const CourseNameHeader = (props) => {
  if (!props.club) throw new Error('CourseNameHeader component requires a club object prop')
  const { isInformal, name, informal } = props.club
  const displayName = isInformal && !!informal ? informal : name
  return (
    <Link to={_parseCourseUrl(props.club)}>{displayName}</Link>
  )
}

export default CourseNameHeader
