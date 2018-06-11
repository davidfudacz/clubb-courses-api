const { Architect } = require('../../server/db/models')

async function seedArchitects () {
  const architectProms = architects.map(architect => {
    return Architect.create(architect)
  })
  await Promise.all(architectProms)
  console.log(`Seeded ${architects.length} architect names`)
}

const architects = [
  {
    givenName: 'Donald',
    surname: 'Ross',
    birthYear: 1872,
    deathYear: 1948,
  },
  {
    givenName: 'Tom',
    surname: 'Fazio',
    birthYear: 1945,
  },
]

module.exports = seedArchitects
