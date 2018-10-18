const db = require('../../server/db')
const seedSubdivisions = require('./subdivisions')
const seedCountries = require('./countries')
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
const seedLocations = require('./locations')

async function seed () {
  try {
    await db.sync({force: true})
    console.log('database synced')

    await seedUsers()
    await seedCountries()
    await seedSubdivisions()
    await seedLocations()
    await seedEmployeeTitles()
    await seedTees()
    await seedArchitects()
    await seedClubs()
    await seedCourses()
    // await seedEmployees()
    await seedBuilds()
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
