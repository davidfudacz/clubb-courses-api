
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
  const rankingListName = rankingListObj.name
  const rankingListNameInformal = rankingListObj.informal
  if (rankingListName) {
    if (isInformal && rankingListNameInformal) {
      return `${publisherName} (${rankingListNameInformal})`
    }
    return `${publisherName} (${rankingListName})`
  }
  else {
    return publisherName
  }
}
