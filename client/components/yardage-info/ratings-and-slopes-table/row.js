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
      <td style={tdStyle}>{teeName}</td>
      <td style={tdStyle}>{frontYardage}</td>
      <td style={tdStyle}>{`${frontRating} / ${frontSlope}`}</td>
      <td style={tdStyle}>{frontPar}</td>
      <td style={tdStyle}>{backYardage}</td>
      <td style={tdStyle}>{`${backRating} / ${backSlope}`}</td>
      <td style={tdStyle}>{backPar}</td>
      <td style={tdStyle}>{totalYardage}</td>
      <td style={tdStyle}>{`${totalRating} / ${totalSlope}`}</td>
      <td style={tdStyle}>{totalPar}</td>
      <td style={tdStyle}>{teeGender}</td>
    </tr>
  )
}

export default Row
