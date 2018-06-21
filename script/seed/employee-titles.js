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
    id: 1,
    title: 'Head Golf Professional',
    informal: 'Head Pro'
  },
  {
    id: 2,
    title: 'Assistant Golf Professional',
    informal: 'Assistant Pro'
  },
  {
    id: 3,
    title: 'Director Of Golf',
  },
  {
    id: 4,
    title: 'General Manager',
    informal: 'GM'
  },
  {
    id: 5,
    title: 'Golf Course Superintendent',
    informal: 'Super'
  },
]

module.exports = seedEmployeeTitles
