import React from 'react'
import YardageRow from './yardage-row'
import ParRow from './par-row'
import HandicapRow from './handicap-row'
import { tableStyle, thStyle } from '../../../styles'
import { _collapseMensParForScorecard, _collapseWomensParForScorecard } from '../../../utilities'

const Scorecard = (props) => {
  const { yardageInfos } = props
  const mensParYardageInfo = _collapseMensParForScorecard(yardageInfos)
  const womensParYardageInfo = _collapseWomensParForScorecard(yardageInfos)
  return (
    <div>
      <h3>Scorecard</h3>
      <table style={tableStyle}>
        <tbody>
        <tr>
          <th style={thStyle}>Hole</th>
          <th style={thStyle}>1</th>
          <th style={thStyle}>2</th>
          <th style={thStyle}>3</th>
          <th style={thStyle}>4</th>
          <th style={thStyle}>5</th>
          <th style={thStyle}>6</th>
          <th style={thStyle}>7</th>
          <th style={thStyle}>8</th>
          <th style={thStyle}>9</th>
          <th style={thStyle}>Out</th>
          <th style={thStyle}>10</th>
          <th style={thStyle}>11</th>
          <th style={thStyle}>12</th>
          <th style={thStyle}>13</th>
          <th style={thStyle}>14</th>
          <th style={thStyle}>15</th>
          <th style={thStyle}>16</th>
          <th style={thStyle}>17</th>
          <th style={thStyle}>18</th>
          <th style={thStyle}>In</th>
          <th style={thStyle}>Total</th>
        </tr>
        {
          yardageInfos.map(yardageInfo => {
            if (yardageInfo.teeGenderId === 1) {
              return (
                <YardageRow key={yardageInfo.id} yardageInfo={yardageInfo} />
              )
            }
          })
        }
        {
          mensParYardageInfo
          ? <ParRow yardageInfo={mensParYardageInfo} />
          : null
        }
        </tbody>
      </table>
    </div>
  )
}

export default Scorecard
