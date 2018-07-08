import React from 'react'
import { tdStyle } from '../../styles'
import { Link } from '../../components'
import { _parseCourseUrl, _parseCourseNameForDisplay } from '../../utilities';

const Row = (props) => {
  const {
    rank,
    course,
  } = props.ranking
  const { yearOriginallyBuilt } = course
  return (
    <tr>
      <td style={tdStyle}>{rank}</td>
      <td style={tdStyle}>{<Link to={_parseCourseUrl(course)}>{_parseCourseNameForDisplay(course)}</Link>}</td>
      <td style={tdStyle}>{yearOriginallyBuilt}</td>
    </tr>
  )
}

export default Row
