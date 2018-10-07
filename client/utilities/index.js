
export * from './clubs'
export * from './courses'
export * from './builds'
export * from './rankings'
export * from './tee-yardage'
export * from './architects'

export const _lowerCaseAlphanumericWithDashes = (string) => {
  if (!string) return null
  const alphanumericString = string.replace(/[^0-9a-zA-Z ]/g, '')
  return alphanumericString.toLowerCase().split(' ').join('-')
}
