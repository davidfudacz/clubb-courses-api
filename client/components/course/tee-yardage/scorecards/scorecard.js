import React from 'react'
import YardageRow from './yardage-row'
import ParRow from './par-row'
import HandicapRow from './handicap-row'
import { tableStyle, thStyle } from '../../../../styles'
import {
  _collapseMensParForScorecard,
  _collapseWomensParForScorecard,
} from '../../../../utilities'

const Scorecard = (props) => {
  const { teeYardages } = props
  const gender = teeYardages[0].teeGender.informal
  const mensParTeeYardage = _collapseMensParForScorecard(teeYardages)
  const womensParTeeYardage = _collapseWomensParForScorecard(teeYardages)
  return (
    <div>
      <h3>{`${gender} Scorecard`}</h3>
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
          teeYardages.map(teeYardage => {
            return (
              <YardageRow key={teeYardage.id} teeYardage={teeYardage} />
            )
          })
        }
        {
          mensParTeeYardage
          ? <ParRow teeYardage={mensParTeeYardage} />
          : null
        }
        {
          womensParTeeYardage
          ? <ParRow teeYardage={womensParTeeYardage} />
          : null
        }
        {
          mensParTeeYardage
          ? <HandicapRow teeYardage={mensParTeeYardage} />
          : null
        }
        {
          womensParTeeYardage
          ? <HandicapRow teeYardage={womensParTeeYardage} />
          : null
        }
        </tbody>
      </table>
    </div>
  )
}

export default Scorecard
