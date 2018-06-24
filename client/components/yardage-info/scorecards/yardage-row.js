import React from 'react'
import { tdStyle, thStyle } from '../../../styles'
import { _sortHolesByNumber } from '../../../utilities'

const YardageRow = (props) => {
  const {
    frontYardage,
    backYardage,
    totalYardage,
    holes,
  } = props.yardageInfo
  const { name: teeName } = props.yardageInfo.tee
  const sortedHoles = _sortHolesByNumber(holes)
  return (
    <tr>
      <th style={thStyle}>{teeName}</th>
      {
        sortedHoles.map(hole => {
          if (+hole.number < 10) {
            return <td key={hole.id} style={tdStyle}>{hole.yardage}</td>
          }
        })
      }
      <td style={tdStyle}>{frontYardage}</td>
      {
        sortedHoles.map(hole => {
          if (+hole.number > 9) {
            return <td key={hole.id} style={tdStyle}>{hole.yardage}</td>
          }
        })
      }
      <td style={tdStyle}>{backYardage}</td>
      <td style={tdStyle}>{totalYardage}</td>
    </tr>
  )
}

export default YardageRow
