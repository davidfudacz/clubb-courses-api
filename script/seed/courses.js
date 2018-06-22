const { Course } = require('../../server/db/models')

const courses = [
  {
    numOfHoles: 18,
    clubId: 1,
  },
  {
    numOfHoles: 18,
    clubId: 2,
  },
  {
    numOfHoles: 18,
    clubId: 3,
  },
  {
    numOfHoles: 18,
    clubId: 4,
  },
  {
    numOfHoles: 18,
    clubId: 5,
  },
  {
    name: 'South Course',
    informal: 'South',
    numOfHoles: 18,
    clubId: 6,
  },
  {
    name: 'North Course',
    informal: 'North',
    numOfHoles: 18,
    clubId: 6,
  },
]

async function seedCourses () {
  const coursesProms = courses.map(course => {
    return Course.create(course)
  })
  await Promise.all(coursesProms)
  console.log(`Seeded ${courses.length} courses`)
}

module.exports = seedCourses
