
export const _sortMensYardageInfos = (yardageInfos) => {
  const output =
    yardageInfos.filter(yardageInfo => yardageInfo.teeGenderId === 1)
    .sort((a, b) => +a.totalYardage - +b.totalYardage)
  return output
}

export const _sortWomensYardageInfos = (yardageInfos) => {
  const output =
    yardageInfos.filter(yardageInfo => yardageInfo.teeGenderId === 2)
    .sort((a, b) => +a.totalYardage - +b.totalYardage)
  return output
}

export const _sortHolesByNumber = (holes) => {
  return holes.sort((a, b) => +a.number - +b.number)
}

export const _collapseMensParForScorecard = (yardageInfos) => {
  return yardageInfos.find(yardageInfo => yardageInfo.teeGenderId === 1)
}

export const _collapseWomensParForScorecard = (yardageInfos) => {
  return yardageInfos.find(yardageInfo => yardageInfo.teeGenderId === 2)
}
