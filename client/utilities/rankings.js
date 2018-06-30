import {
  _lowerCaseAlphanumericWithDashes,
} from '../utilities'

export const _parsePublisherNameForDisplay = (publisherObj, isInformal) => {
  const publisherName = publisherObj.name
  const publisherNameInformal = publisherObj.informal
    if (isInformal && publisherNameInformal) {
      return publisherNameInformal
    }
    return publisherName
}

export const _parseRankingListNameForDisplay = (rankingListObj, isInformal) => {
  if (!rankingListObj.rankingListName) return null
  const publisherName = _parsePublisherNameForDisplay(rankingListObj.publisher, isInformal)
  const rankingListName = rankingListObj.rankingListName.name
  const rankingListNameInformal = rankingListObj.rankingListName.informal
  if (isInformal && rankingListNameInformal) {
    return `${rankingListNameInformal} (${publisherName})`
  }
  return `${rankingListName} (${publisherName})`
}

export const _parseRankingListUrl = (rankingListObj) => {
  const id = rankingListObj.id
  const name = rankingListObj.rankingListName.name
  const publisherName = rankingListObj.publisher.name
  const year = rankingListObj.year
  let parsedName = _lowerCaseAlphanumericWithDashes(name)
  let parsedPublisherName = _lowerCaseAlphanumericWithDashes(publisherName)
  return `/ranking-lists/${id}/${parsedPublisherName}-${parsedName}-${year}`
}

export const _sortRankingsByRank = (rankings) => {
  return rankings.sort((a, b) => {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  })
}
