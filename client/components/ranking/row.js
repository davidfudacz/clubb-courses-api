import React from 'react'
import { tdStyle } from '../../styles'
import { CourseNameLink } from '../../components'

const Row = (props) => {
  const {
    rank,
    course,
  } = props.ranking
  const { yearOriginallyBuilt } = course
  return (
    <tr>
      <td style={tdStyle}>{rank}</td>
      <td style={tdStyle}>{<CourseNameLink course={course} />}</td>
      <td style={tdStyle}>{yearOriginallyBuilt}</td>
    </tr>
  )
}

export default Row
