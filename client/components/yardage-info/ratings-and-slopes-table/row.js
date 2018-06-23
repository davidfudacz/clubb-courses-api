import React from 'react'
import { tdStyle } from '../../../styles'

const Row = (props) => {
  const {
    frontPar,
    frontRating,
    frontSlope,
    frontYardage,
    backPar,
    backRating,
    backSlope,
    backYardage,
    totalPar,
    totalRating,
    totalSlope,
    totalYardage,
  } = props.yardageInfo
  const { name: teeName } = props.yardageInfo.tee
  const { abbreviation: teeGender } = props.yardageInfo.teeGender
  return (
    <tr>
      <th style={tdStyle}>{teeName}</th>
      <th style={tdStyle}>{frontYardage}</th>
      <th style={tdStyle}>{`${frontRating} / ${frontSlope}`}</th>
      <th style={tdStyle}>{frontPar}</th>
      <th style={tdStyle}>{backYardage}</th>
      <th style={tdStyle}>{`${backRating} / ${backSlope}`}</th>
      <th style={tdStyle}>{backPar}</th>
      <th style={tdStyle}>{totalYardage}</th>
      <th style={tdStyle}>{`${totalRating} / ${totalSlope}`}</th>
      <th style={tdStyle}>{totalPar}</th>
      <th style={tdStyle}>{teeGender}</th>
    </tr>
  )
}

export default Row
