import React from 'react'
import YardageInfoWrapper from './yardage-info-wrapper'

const Course = (props) => {
  return (
    <YardageInfoWrapper yardageInfos={props.course.yardageInfos} />
  )
}

export default Course
