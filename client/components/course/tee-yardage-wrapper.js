import React from 'react'
import {
  RatingsAndSlopesTable,
  ScorecardsWrapper,
} from './index.js'

const TeeYardageWrapper = (props) => {
  const { teeYardages } = props
  if (teeYardages.length) {
    return (
      <div>
        <RatingsAndSlopesTable teeYardages={teeYardages} />
        <ScorecardsWrapper teeYardages={teeYardages} />
      </div>
    )
  }
  else {
    return (
      <h4>There is no yardage information for this golf course</h4>
    )
  }
}

export default TeeYardageWrapper
