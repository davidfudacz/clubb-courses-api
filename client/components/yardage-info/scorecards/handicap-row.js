import React from 'react'
import { thStyle, tdStyle } from '../../../styles'
import { _sortHolesByNumber } from '../../../utilities'

const ParRow = (props) => {
  const {
    holes,
  } = props.yardageInfo
  const sortedHoles = _sortHolesByNumber(holes)
  const teeGender = props.yardageInfo.teeGender.informal
  const genderAccessor = teeGender.replace(`'`, ``).toLowerCase() + 'Handicap'
  return (
    <tr>
      <th style={thStyle}>{`${teeGender} Handicap`}</th>
      {
        sortedHoles.map(hole => {
          if (+hole.number < 10) {
            return <td key={hole.id} style={tdStyle}>{hole[genderAccessor]}</td>
          }
        })
      }
      <td style={tdStyle} />
      {
        sortedHoles.map(hole => {
          if (+hole.number > 9) {
            return <td key={hole.id} style={tdStyle}>{hole[genderAccessor]}</td>
          }
        })
      }
      <td style={tdStyle} />
      <td style={tdStyle} />
    </tr>
  )
}

export default ParRow
