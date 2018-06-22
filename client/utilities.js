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

export const _parseCourseNameForDisplay = (courseObj, isInformal) => {
  const clubName = courseObj.club.name
  const clubNameInformal = courseObj.club.informal
  const courseName = courseObj.name
  const courseNameInformal = courseObj.informal
  if (courseName) {
    if (isInformal && courseNameInformal) {
      return `${clubNameInformal} (${courseNameInformal})`
    }
    return `${clubName} (${courseName})`
  }
  else {
    if (isInformal && clubNameInformal) {
      return clubNameInformal
    }
    return clubName
  }
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
