const { Build } = require('../../server/db/models')

const builds = [
  {
    courseId: 1,
    architects: [1],
    year: 1908,
    buildType: 'original',
    numOfHoles: 18,
  },
  {
    courseId: 2,
    architects: [2],
    year: 1972,
    buildType: 'original',
    numOfHoles: 18,
  },
  {
    courseId: 3,
    architects: [1, 10],
    year: 1913,
    buildType: 'original',
    numOfHoles: 18,
  },
  {
    courseId: 4,
    architects: [6],
    year: 1892,
    buildType: 'original',
    numOfHoles: 18,
  },
  {
    courseId: 5,
    architects: [9],
    year: 1916,
    buildType: 'original',
    numOfHoles: 18,
  },
  {
    courseId: 6,
    architects: [8],
    year: 1915,
    buildType: 'original',
    numOfHoles: 18,
  },
  {
    courseId: 7,
    architects: [5],
    year: 1915,
    buildType: 'original',
    numOfHoles: 18,
  },
]

async function seedBuilds () {
  const buildsProms = builds.map(async build => {
    const { buildType, year, courseId, architects, numOfHoles } = build
    const createdBuild = await Build.create({
      buildType,
      year,
      numOfHoles,
    })
    await createdBuild.setCourse(courseId)
    await createdBuild.addArchitects(architects)
  })
  await Promise.all(buildsProms)
  console.log(`Seeded ${builds.length} builds`)
}

module.exports = seedBuilds
