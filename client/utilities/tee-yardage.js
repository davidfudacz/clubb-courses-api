
export const _sortMensTeeYardages = (teeYardages) => {
  const output =
    teeYardages.filter(teeYardage => teeYardage.teeGenderId === 1)
    .sort((a, b) => +a.totalYardage - +b.totalYardage)
  return output
}

export const _sortWomensTeeYardages = (teeYardages) => {
  const output =
    teeYardages.filter(teeYardage => teeYardage.teeGenderId === 2)
    .sort((a, b) => +a.totalYardage - +b.totalYardage)
  return output
}

export const _sortHolesByNumber = (holes) => {
  return holes.sort((a, b) => +a.number - +b.number)
}

export const _collapseMensParForScorecard = (teeYardages) => {
  return teeYardages.find(teeYardage => teeYardage.teeGenderId === 1)
}

export const _collapseWomensParForScorecard = (teeYardages) => {
  return teeYardages.find(teeYardage => teeYardage.teeGenderId === 2)
}
