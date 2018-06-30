
import {
  _parseClubNameForDisplay,
  _lowerCaseAlphanumericWithDashes,
} from '../utilities'

export const _parseCourseUrl = (courseObj) => {
  let url = `/clubs`
  url += `/${courseObj.club.id}`
  url += `/${_lowerCaseAlphanumericWithDashes(courseObj.club.name)}`
  if (courseObj.name) {
    url += `/${courseObj.id}`
    url += `/${_lowerCaseAlphanumericWithDashes(courseObj.name)}`
  }
  return url
}

export const _parseCourseNameForDisplay = (courseObj, isInformal, onlyCourseName) => {
  const courseName = courseObj.name
  const courseNameInformal = courseObj.informal
  if (onlyCourseName) {
    if (isInformal && courseNameInformal) {
      return courseNameInformal
    }
    return courseName
  }
  const clubName = _parseClubNameForDisplay(courseObj.club, isInformal)
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
