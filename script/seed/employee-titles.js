const { EmployeeTitle } = require('../../server/db/models')

async function seedEmployeeTitles () {
  const employeeTitleProms = employeeTitles.map(title => {
    return EmployeeTitle.create(title)
  })
  await Promise.all(employeeTitleProms)
  console.log(`Seeded ${employeeTitles.length} employee titles`)
}

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

module.exports = seedEmployeeTitles
