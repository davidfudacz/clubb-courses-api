export const required = (value, allValues, props) => {
  if (value || typeof value === 'number') return undefined
  else return 'This field is required'
}

export const fourDigitYear = value => {
  if (value && (value.length !== 4 || isNaN(Number(value)))) {
    return 'Years must be a 4 digit number'
  }
}
