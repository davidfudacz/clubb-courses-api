import React from 'react'
import { Header } from '../ui-elements'

const CourseNameHeader = (props) => {
  if (!props.club) throw new Error('CourseNameHeader component requires a club object prop')
  const { isInformal, name, informal } = props.club
  const displayName = isInformal && !!informal ? informal : name
  return (
    <Header>{displayName}</Header>
  )
}

export default CourseNameHeader
