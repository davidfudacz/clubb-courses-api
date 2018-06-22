const { Employee } = require('../../server/db/models')

const employees = [
  {
    clubId: 1,
    givenName: 'John',
    surname: 'Varner',
    startYear: 1997,
    employeeTitleId: 1,
  },
  {
    clubId: 3,
    givenName: 'Jason',
    surname: 'Moss',
    startYear: 2014,
    employeeTitleId: 2,
  },
  {
    clubId: 1,
    givenName: 'Kirk',
    surname: 'Speith',
    startYear: 2012,
    employeeTitleId: 5,
  },
  {
    clubId: 3,
    givenName: 'Kevin',
    surname: 'Marion',
    startYear: 2000,
    employeeTitleId: 4,
  },
  {
    clubId: 3,
    givenName: 'Bret',
    surname: 'Leon',
    startYear: 2014,
    employeeTitleId: 1,
  },
  {
    clubId: 3,
    givenName: 'Curtis',
    surname: 'James',
    startYear: 2010,
    employeeTitleId: 5,
  },
]

async function seedEmployees () {
  const employeesProms = employees.map(async employee => {
    const { clubId, givenName, surname, startYear, employeeTitleId } = employee
    const createdEmployee = await Employee.create({
      givenName,
      surname,
      startYear,
      employeeTitleId,
    })
    await createdEmployee.addClub(clubId)
  })
  await Promise.all(employeesProms)
  console.log(`Seeded ${employees.length} employees`)
}

module.exports = seedEmployees
