
export const _parseArchitectName = (architect) => {
  return architect.givenName + ' ' + architect.surname
}

export const _sortArchitectsAlphabetically = (architects) => {
  return architects.sort((a, b) => {
    let nameA = a.surname.toUpperCase()
    let nameB = b.surname.toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
}