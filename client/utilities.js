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

export const _parseCourseNameForDisplay = (courseObj, informal) => {
  const clubName = courseObj.club.name
  const clubNameInformal = courseObj.club.informal
  const courseName = courseObj.name
  const courseNameInformal = courseObj.informal
  if (courseName) {
    if (informal) {
      return `${clubNameInformal} (${courseNameInformal})`
    }
    return `${clubName} (${courseName})`
  }
  else {
    if (informal) {
      return clubNameInformal
    }
    return clubName
  }
}

export const _parseClubNameForDisplay = (clubObj, informal) => {
  const clubName = clubObj.name
  const clubNameInformal = clubObj.informal
    if (informal) {
      return clubNameInformal
    }
    return clubName
}
