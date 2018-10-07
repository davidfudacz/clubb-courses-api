import React from 'react'
import Scorecard from './scorecard'
import {
  _sortMensTeeYardages,
  _sortWomensTeeYardages,
} from '../../../../utilities'

const ScorecardWrapper = (props) => {
  const { teeYardages } = props
  const mensTeeYardages = _sortMensTeeYardages(teeYardages)
  const womensTeeYardages = _sortWomensTeeYardages(teeYardages)
  if (mensTeeYardages.length || womensTeeYardages.length) {
    return (
      <div>
        {
          mensTeeYardages.length
          ? <Scorecard teeYardages={mensTeeYardages} />
          : null
        }
        {
          womensTeeYardages.length
          ? <Scorecard teeYardages={womensTeeYardages} />
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
