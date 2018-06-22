const { Tee } = require('../../server/db/models')

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

async function seedTees () {
  const teeProms = tees.map(tee => {
    return Tee.create(tee)
  })
  await Promise.all(teeProms)
  console.log(`Seeded ${tees.length} tee names`)
}

module.exports = seedTees
