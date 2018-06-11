const { Course } = require('../../server/db/models')

async function seedCourses () {
  const coursesProms = courses.map(course => {
    return Course.create(course)
  })
  await Promise.all(coursesProms)
  console.log(`Seeded ${courses.length} courses`)
}

const courses = [
  {
    name: 'North Course',
    informal: 'North',
    built: '1908',
    numOfHoles: 18,
    clubId: 1,
  },
  {
    name: 'South Course',
    informal: 'South',
    built: '1908',
    numOfHoles: 18,
    clubId: 1,
  },
  {
    built: '1908',
    numOfHoles: 18,
    clubId: 2,
  },
  {
    built: '1908',
    numOfHoles: 18,
    clubId: 3,
  },
]

module.exports = seedCourses
