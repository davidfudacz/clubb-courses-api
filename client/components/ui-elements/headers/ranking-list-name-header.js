import React from 'react'
import Header from './header'
import { _parseRankingListNameForDisplay } from '../../../utilities'

const RankingListNameHeader = (props) => {
  if (!props.rankingList) throw new Error('RankingListNameHeader component requires a rankingList object prop')
  const { isInformal, rankingList } = props
  return (
    <Header>{_parseRankingListNameForDisplay(rankingList, isInformal)}</Header>
  )
}

export default RankingListNameHeader
