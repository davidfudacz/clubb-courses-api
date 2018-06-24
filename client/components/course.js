import React from 'react'
import {
  YardageInfoWrapper,
} from '../components'

const Course = (props) => {
  return (
    <YardageInfoWrapper yardageInfos={props.course.yardageInfos} />
  )
}

export default Course
