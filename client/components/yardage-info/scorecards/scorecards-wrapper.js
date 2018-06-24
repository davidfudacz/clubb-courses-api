import React from 'react'
import Scorecard from './scorecard'
import {
  _sortMensYardageInfos,
  _sortWomensYardageInfos,
} from '../../../utilities'

const ScorecardWrapper = (props) => {
  const { yardageInfos } = props
  const mensYardageInfos = _sortMensYardageInfos(yardageInfos)
  const womensYardageInfos = _sortWomensYardageInfos(yardageInfos)
  if (mensYardageInfos.length || womensYardageInfos.length) {
    return (
      <div>
        {
          mensYardageInfos.length
          ? <Scorecard yardageInfos={mensYardageInfos} />
          : null
        }
        {
          womensYardageInfos.length
          ? <Scorecard yardageInfos={womensYardageInfos} />
          : null
        }
      </div>
    )
  }
  else {
    return (
      <h4>There is no yardage information for this golf course</h4>
    )
  }
}

export default ScorecardWrapper
