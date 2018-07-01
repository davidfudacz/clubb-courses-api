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
  await courses.forEach(async course => {
    await Course.create(course)
  })
  console.log(`Seeded ${courses.length} courses`)
}

module.exports = seedCourses
