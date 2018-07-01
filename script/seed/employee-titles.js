const { EmployeeTitle } = require('../../server/db/models')

const employeeTitles = [
  {
    title: 'Head Golf Professional',
    informal: 'Head Pro'
  },
  {
    title: 'Assistant Golf Professional',
    informal: 'Assistant Pro'
  },
  {
    title: 'Director Of Golf',
  },
  {
    title: 'General Manager',
    informal: 'GM'
  },
  {
    title: 'Golf Course Superintendent',
    informal: 'Super'
  },
]

async function seedEmployeeTitles () {
  await employeeTitles.forEach(async title => {
    await EmployeeTitle.create(title)
  })
  console.log(`Seeded ${employeeTitles.length} employee titles`)
}

module.exports = seedEmployeeTitles
