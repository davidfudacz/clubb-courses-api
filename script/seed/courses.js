const { Course } = require('../../server/db/models')

const courses = [
  {
    id: 1,
    numOfHoles: 18,
    clubId: 1,
  },
  {
    id: 2,
    numOfHoles: 18,
    clubId: 2,
  },
  {
    id: 3,
    numOfHoles: 18,
    clubId: 3,
  },
  {
    id: 4,
    numOfHoles: 18,
    clubId: 4,
  },
  {
    id: 5,
    numOfHoles: 18,
    clubId: 5,
  },
  {
    id: 6,
    name: 'South Course',
    informal: 'South',
    numOfHoles: 18,
    clubId: 6,
  },
  {
    id: 7,
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
