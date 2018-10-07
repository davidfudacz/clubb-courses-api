import React from 'react'
import TeeYardageWrapper from './tee-yardage-wrapper'
import BuildWrapper from './build-wrapper'

const Course = (props) => {
  return (
    <div>
      <BuildWrapper builds={props.course.builds} />
      <TeeYardageWrapper teeYardages={props.course.teeYardages} />
    </div>
  )
}

export default Course
