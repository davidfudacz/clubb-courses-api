const { Course } = require('../../server/db/models')

const courses = [
  {
    numOfHoles: 18,
    club: 1,
  },
  {
    numOfHoles: 18,
    club: 2,
  },
  {
    numOfHoles: 18,
    club: 3,
  },
  {
    numOfHoles: 18,
    club: 4,
  },
  {
    numOfHoles: 18,
    club: 5,
  },
  {
    name: 'South Course',
    informal: 'South',
    numOfHoles: 18,
    club: 6,
  },
  {
    name: 'North Course',
    informal: 'North',
    numOfHoles: 18,
    club: 6,
  },
]

async function seedCourses () {
  await courses.forEach(async ({ name, informal, numOfHoles, club }) => {
    const courseCreated = await Course.create({
      name,
      informal,
      numOfHoles,
    })
    await courseCreated.setClub(club)
  })
  console.log(`Seeded ${courses.length} courses`)
}

module.exports = seedCourses
