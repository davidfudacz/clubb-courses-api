import React from 'react'
import YardageInfoWrapper from './yardage-info-wrapper'
import BuildWrapper from './build-wrapper'

const Course = (props) => {
  return (
    <div>
      <BuildWrapper builds={props.course.builds} />
      <YardageInfoWrapper yardageInfos={props.course.yardageInfos} />
    </div>
  )
}

export default Course
