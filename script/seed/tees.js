const { Tee } = require('../../server/db/models')

async function seedTees () {
  const teeProms = tees.map(title => {
    return Tee.create(title)
  })
  await Promise.all(teeProms)
  console.log(`Seeded ${tees.length} tee names`)
}

const tees = [
  {
    name: 'Black',
  },
  {
    name: 'White',
  },
  {
    name: 'Red',
  },
  {
    name: 'Tips',
  },
  {
    name: 'Championship',
  },
]

module.exports = seedTees
