import React from 'react'
import {
  RatingsAndSlopesTable,
  ScorecardsWrapper,
} from './index.js'

const YardageInfoWrapper = (props) => {
  const { yardageInfos } = props
  if (yardageInfos.length) {
    return (
      <div>
        <RatingsAndSlopesTable yardageInfos={yardageInfos} />
        <ScorecardsWrapper yardageInfos={yardageInfos} />
      </div>
    )
  }
  else {
    return (
      <h4>There is no yardage information for this golf course</h4>
    )
  }
}

export default YardageInfoWrapper
