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
  if (courseName) parsedName += courseName.toLowerCase().split(' ').join('-')
  return `/courses/${id}/${parsedName}`
}
