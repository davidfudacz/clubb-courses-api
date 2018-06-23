const { YardageInfo, Hole, TeeGender } = require('../../server/db/models')

const holes = [
  {
    number: 1,
    yardage: 356,
    par: 4,
    mensHandicap: 13,
    YardageInfoId: 1,
  },
  {
    number: 2,
    yardage: 582,
    par: 5,
    mensHandicap: 3,
    YardageInfoId: 1,
  },
  {
    number: 3,
    yardage: 245,
    par: 3,
    mensHandicap: 15,
    YardageInfoId: 1,
  },
  {
    number: 4,
    yardage: 299,
    par: 4,
    mensHandicap: 7,
    YardageInfoId: 1,
  },
  {
    number: 5,
    yardage: 415,
    par: 4,
    mensHandicap: 5,
    YardageInfoId: 1,
  },
  {
    number: 6,
    yardage: 189,
    par: 3,
    mensHandicap: 17,
    YardageInfoId: 1,
  },
  {
    number: 7,
    yardage: 574,
    par: 5,
    mensHandicap: 1,
    YardageInfoId: 1,
  },
  {
    number: 8,
    yardage: 424,
    par: 4,
    mensHandicap: 9,
    YardageInfoId: 1,
  },
  {
    number: 9,
    yardage: 413,
    par: 4,
    mensHandicap: 11,
    YardageInfoId: 1,
  },
  {
    number: 10,
    yardage: 198,
    par: 3,
    mensHandicap: 16,
    YardageInfoId: 1,
  },
  {
    number: 11,
    yardage: 604,
    par: 5,
    mensHandicap: 2,
    YardageInfoId: 1,
  },
  {
    number: 12,
    yardage: 165,
    par: 3,
    mensHandicap: 18,
    YardageInfoId: 1,
  },
  {
    number: 13,
    yardage: 385,
    par: 4,
    mensHandicap: 10,
    YardageInfoId: 1,
  },
  {
    number: 14,
    yardage: 333,
    par: 4,
    mensHandicap: 12,
    YardageInfoId: 1,
  },
  {
    number: 15,
    yardage: 465,
    par: 4,
    mensHandicap: 6,
    YardageInfoId: 1,
  },
  {
    number: 16,
    yardage: 441,
    par: 4,
    mensHandicap: 8,
    YardageInfoId: 1,
  },
  {
    number: 17,
    yardage: 229,
    par: 3,
    mensHandicap: 14,
    YardageInfoId: 1,
  },
  {
    number: 18,
    yardage: 599,
    par: 5,
    mensHandicap: 4,
    YardageInfoId: 1,
  },
]

async function seedTees () {
  await TeeGender.create({
    formal: `Gentlemen's`,
    informal: `Men's`,
    abbreviation: `M`,
  })
  await YardageInfo.create({
    frontYardage: 3597,
    backYardage: 3419,
    totalYardage: 7016,
    frontPar: 36,
    backPar: 35,
    totalPar: 71,
    frontRating: 37.7,
    backRating: 36.7,
    frontSlope: 140,
    backSlope: 137,
    totalRating: 74.4,
    totalSlope: 139,
    courseId: 4,
    teeId: 1,
    teeGenderId: 1,
  })
  const holeProms = holes.map(hole => {
    return Hole.create(hole)
  })
  await Promise.all(holeProms)
  console.log(`Seeded ${holes.length} holes`)
}

module.exports = seedTees
