
export const _parsePublisherNameForDisplay = (publisherObj, isInformal) => {
  const publisherName = publisherObj.name
  const publisherNameInformal = publisherObj.informal
    if (isInformal && publisherNameInformal) {
      return publisherNameInformal
    }
    return publisherName
}

export const _parseRankingListNameForDisplay = (rankingListObj, isInformal) => {
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
  let parsedName = name.toLowerCase().split(' ').join('-')
  let parsedPublisherName = publisherName.toLowerCase().split(' ').join('-')
  return `/ranking-lists/${id}/${parsedPublisherName}-${parsedName}-${year}`
}
