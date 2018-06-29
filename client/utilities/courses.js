/* eslint id-length: 0 */
import {
  _parseClubNameForDisplay,
} from '../utilities'

export const _parseCourseUrl = (courseObj) => {
  const id = courseObj.id
  const name = courseObj.club.name
  const courseName = courseObj.name
  let parsedName = name.toLowerCase().split(' ').join('-')
  if (courseName) parsedName += `-${courseName.toLowerCase().split(' ').join('-')}`
  return `/courses/${id}/${parsedName}`
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