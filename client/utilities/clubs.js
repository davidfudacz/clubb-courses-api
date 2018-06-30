
export const _parseClubUrl = (clubObj) => {
  const id = clubObj.id
  const name = clubObj.name
  const parsedName = name.toLowerCase().split(' ').join('-')
  return `/clubs/${id}/${parsedName}`
}

export const _parseClubNameForDisplay = (clubObj, isInformal) => {
  const clubName = clubObj.name
  const clubNameInformal = clubObj.informal
    if (isInformal && clubNameInformal) {
      return clubNameInformal
    }
    return clubName
}

export const _sortClubsAlphabetically = (clubs, isInformal) => {
  return clubs.sort((a, b) => {
    let nameA = _parseClubNameForDisplay(a, isInformal).toUpperCase()
    let nameB = _parseClubNameForDisplay(b, isInformal).toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
}
