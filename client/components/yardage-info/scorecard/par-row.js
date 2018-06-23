import React from 'react'
import { thStyle } from '../../../styles'
import { _sortHolesByNumber } from '../../../utilities'

const ParRow = (props) => {
  const {
    frontPar,
    backPar,
    totalPar,
    holes,
  } = props.yardageInfo
  const sortedHoles = _sortHolesByNumber(holes)
  const teeGender = props.yardageInfo.teeGender.informal
  return (
    <tr>
      <th style={thStyle}>{`${teeGender} Par`}</th>
      {
        sortedHoles.map(hole => {
          if (+hole.number < 10) {
            return <th key={hole.id} style={thStyle}>{hole.par}</th>
          }
        })
      }
      <th style={thStyle}>{frontPar}</th>
      {
        sortedHoles.map(hole => {
          if (+hole.number > 9) {
            return <th key={hole.id} style={thStyle}>{hole.par}</th>
          }
        })
      }
      <th style={thStyle}>{backPar}</th>
      <th style={thStyle}>{totalPar}</th>
    </tr>
  )
}

export default ParRow
