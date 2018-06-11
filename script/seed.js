const db = require('../server/db')
const { User, Club, Course } = require('../server/db/models')


const users = [
  {
    givenName: 'Dave',
    surname: 'Fudacz',
    email: 'davidfudacz@gmail.com',
  },
  {
    givenName: 'Jason',
    surname: 'Moss',
    email: 'jmoss4688@gmail.com',
  }
]

const clubs = [
  {
    name: 'Beverly Country Club',
    shortName: 'Beverly',
    established: 1908,
  },
  {
    name: 'Butler Golf Club',
    shortName: 'Butler',
    established: 1974,
  },
  {
    name: 'Old Elm Club',
    shortName: 'Old Elm',
    established: 1912,
  }
]

const seed = async () => {
  try {
    await db.sync({force: true})
    console.log('database synced')

    await User.bulkCreate(users)
    console.log(`Seeded ${users.length} users`)
    await Club.bulkCreate(clubs)
    console.log(`Seeded ${clubs.length} clubs`)

    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  }
  catch (err) {
    console.log(err)
  }
}

seed()
