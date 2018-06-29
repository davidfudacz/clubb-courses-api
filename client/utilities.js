/* eslint id-length: 0 */
export const _parseClubUrl = (clubObj) => {
  const id = clubObj.id
  const name = clubObj.name
  const parsedName = name.toLowerCase().split(' ').join('-')
  return `/clubs/${id}/${parsedName}`
}

export const _parseCourseUrl = (courseObj) => {
  const id = courseObj.id
  const name = courseObj.club.name
  const courseName = courseObj.name
  let parsedName = name.toLowerCase().split(' ').join('-')
  if (courseName) parsedName += `-${courseName.toLowerCase().split(' ').join('-')}`
  return `/courses/${id}/${parsedName}`
}

export const _parseClubNameForDisplay = (clubObj, isInformal) => {
  const clubName = clubObj.name
  const clubNameInformal = clubObj.informal
    if (isInformal && clubNameInformal) {
      return clubNameInformal
    }
    return clubName
}

export const _parseCourseNameForDisplay = (courseObj, isInformal) => {
  const clubName = _parseClubNameForDisplay(courseObj.club, isInformal)
  const courseName = courseObj.name
  const courseNameInformal = courseObj.informal
  if (courseName) {
    if (isInformal && courseNameInformal) {
      return `${clubName} (${courseNameInformal})`
    }
    return `${clubName} (${courseName})`
  }
  else {
    return clubName
  }
}

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

export const _sortCoursesAlphabetically = (courses, isInformal) => {
  return courses.sort((a, b) => {
    let nameA = _parseCourseNameForDisplay(a, isInformal).toUpperCase()
    let nameB = _parseCourseNameForDisplay(b, isInformal).toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
}

export const _sortMensYardageInfos = (yardageInfos) => {
  const output =
    yardageInfos.filter(yardageInfo => yardageInfo.teeGenderId === 1)
    .sort((a, b) => +a.totalYardage - +b.totalYardage)
  return output
}

export const _sortWomensYardageInfos = (yardageInfos) => {
  const output =
    yardageInfos.filter(yardageInfo => yardageInfo.teeGenderId === 2)
    .sort((a, b) => +a.totalYardage - +b.totalYardage)
  return output
}

export const _sortHolesByNumber = (holes) => {
  return holes.sort((a, b) => +a.number - +b.number)
}

export const _collapseMensParForScorecard = (yardageInfos) => {
  return yardageInfos.find(yardageInfo => yardageInfo.teeGenderId === 1)
}

export const _collapseWomensParForScorecard = (yardageInfos) => {
  return yardageInfos.find(yardageInfo => yardageInfo.teeGenderId === 2)
}

export const _parseArchitectName = (architect) => {
  return architect.givenName + ' ' + architect.surname
}

export const _parseBuildWordingForDisplay = (build) => {
  const architectsParsedArr = build.architects.map(architect => _parseArchitectName(architect))
  const architectsString = architectsParsedArr.join(' & ')
  let output = ''
  switch (build.buildType) {
    case 'original':
      output += 'Designed by '
      break
    case 'redesign':
      output += 'Redesigned by '
      break
    case 'restoration':
      output += 'Restored by '
      break
    default:
      output += ''
  }
  output += architectsString
  output += ` in ${build.year}`
  return output
}
