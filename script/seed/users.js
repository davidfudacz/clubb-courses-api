const { User } = require('../../server/db/models')

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

async function seedUsers () {
  const usersProms = users.map(user => {
    return User.create(user)
  })
  await Promise.all(usersProms)
  console.log(`Seeded ${users.length} users`)
}

module.exports = seedUsers
