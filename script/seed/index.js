const db = require('../../server/db')
const { State, User, Club } = require('../../server/db/models')
const states = require('./states')
const users = require('./users')
const clubs = require('./clubs')

async function seedUsers () {
  const usersProms = users.map(user => {
    return User.create(user)
  })
  await Promise.all(usersProms)
  console.log(`Seeded ${users.length} users`)
}

async function seedClubs () {
  const clubsProms = clubs.map(club => {
    return Club.create(club)
  })
  await Promise.all(clubsProms)
  console.log(`Seeded ${clubs.length} clubs`)
}

async function seedStates () {
  const statesProms = states.map(state => {
    return State.create(state)
  })
  await Promise.all(statesProms)
  console.log(`Seeded ${states.length} users`)
}


async function seed () {
  try {
    await db.sync({force: true})
    console.log('database synced')

    await seedUsers()
    await seedClubs()
    await seedStates()

    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  }
  catch (err) {
    console.log(err)
  }
}

// let's do it
seed()
