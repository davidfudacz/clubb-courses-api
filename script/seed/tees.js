const { Tee } = require('../../server/db/models')

const tees = [
  {
    id: 1,
    name: 'Black',
  },
  {
    id: 2,
    name: 'White',
  },
  {
    id: 3,
    name: 'Red',
  },
  {
    id: 4,
    name: 'Tips',
  },
  {
    id: 5,
    name: 'Championship',
  },
]

async function seedTees () {
  const teeProms = tees.map(tee => {
    return Tee.create(tee)
  })
  await Promise.all(teeProms)
  console.log(`Seeded ${tees.length} tee names`)
}

module.exports = seedTees
