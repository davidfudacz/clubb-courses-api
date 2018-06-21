const db = require('../../server/db')
const seedStates = require('./states')
const seedUsers = require('./users')
const seedClubs = require('./clubs')
const seedEmployeeTitles = require('./employee-titles')
const seedTees = require('./tees')
const seedArchitects = require('./architects')
const seedMemberships = require('./memberships')
const seedCourses = require('./courses')
const seedBuilds = require('./builds')

async function seed () {
  try {
    await db.sync({force: true})
    console.log('database synced')

    await seedUsers()
    await seedClubs()
    await seedStates()
    await seedEmployeeTitles()
    await seedTees()
    await seedArchitects()
    await seedMemberships()
    await seedCourses()
    await seedBuilds()

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
