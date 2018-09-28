const db = require('../../server/db')
const seedStates = require('./states')
const seedUsers = require('./users')
const seedClubs = require('./clubs')
const seedEmployeeTitles = require('./employee-titles')
const seedTees = require('./tees')
const seedArchitects = require('./architects')
const seedCourses = require('./courses')
const seedBuilds = require('./builds')
const seedEmployees = require('./employees')
const seedYardage = require('./yardage')
const seedRankings = require('./rankings')
const seedScorecards = require('./scorecards')

async function seed () {
  try {
    await db.sync({force: true})
    console.log('database synced')

    await seedUsers()
    await seedStates()
    await seedEmployeeTitles()
    await seedTees()
    await seedArchitects()
    await seedClubs()
    await seedCourses()
    await seedBuilds()
    await seedEmployees()
    await seedYardage()
    await seedRankings()
    await seedScorecards()

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
