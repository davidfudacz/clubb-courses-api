import React from 'react'
import Link from './link'
import { _parseRankingListUrl, _parseRankingListNameForDisplay } from '../../../utilities'

const RankingListLink = (props) => {
  if (!props.rankingList) throw new Error('RankingListLink component requires a club object prop')
  const { isInformal, rankingList } = props
  return (
    <Link to={_parseRankingListUrl(props.rankingList)}>{_parseRankingListNameForDisplay(rankingList, isInformal)}</Link>
  )
}

export default RankingListLink
