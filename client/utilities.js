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
