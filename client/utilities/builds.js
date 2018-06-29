import {
  _parseArchitectName,
} from '../utilities'

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
