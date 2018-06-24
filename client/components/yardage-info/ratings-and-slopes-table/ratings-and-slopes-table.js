import React from 'react'
import Row from './row'
import { tableStyle, thStyle } from '../../../styles'

const RatingsAndSlopesTable = (props) => {
  const { yardageInfos } = props
  return (
    <div>
      <h3>Front/Back Ratings and Slopes</h3>
      <table style={tableStyle}>
        <tbody>
        <tr>
          <th style={thStyle}></th>
          <th colSpan={'3'} style={thStyle}>Front Nine</th>
          <th colSpan={'3'}  style={thStyle}>Back Nine</th>
          <th colSpan={'3'}  style={thStyle}>Total</th>
          <th style={thStyle}></th>
        </tr>
        <tr>
          <th style={thStyle}>Tee Name</th>
          <th style={thStyle}>Yardage</th>
          <th style={thStyle}>Rating/Slope</th>
          <th style={thStyle}>Par</th>
          <th style={thStyle}>Yardage</th>
          <th style={thStyle}>Rating/Slope</th>
          <th style={thStyle}>Par</th>
          <th style={thStyle}>Yardage</th>
          <th style={thStyle}>Rating/Slope</th>
          <th style={thStyle}>Par</th>
          <th style={thStyle}>Gender</th>
        </tr>
        {
          yardageInfos.map(yardageInfo => {
            return (
              <Row key={yardageInfo.id} yardageInfo={yardageInfo} />
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default RatingsAndSlopesTable
