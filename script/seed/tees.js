const { Tee } = require('../../server/db/models')

const tees = [
  {
    name: 'Black',
  },
  {
    name: 'Blue',
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
  await tees.forEach(async tee => {
    await Tee.create(tee)
  })
  console.log(`Seeded ${tees.length} tee names`)
}

module.exports = seedTees
