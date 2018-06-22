const { Architect } = require('../../server/db/models')

const architects = [
  {
    id: 1,
    givenName: 'Donald',
    surname: 'Ross',
    birthYear: 1872,
    deathYear: 1948,
  },
  {
    id: 2,
    givenName: 'George',
    surname: 'Fazio',
    birthYear: 1912,
    deathYear: 1986,
  },
  {
    id: 3,
    givenName: 'Robert Trent',
    surname: 'Jones',
    birthYear: 1906,
    deathYear: 2000,
  },
  {
    id: 4,
    givenName: 'Alister',
    surname: 'MacKenzie',
    birthYear: 1870,
    deathYear: 1934,
  },
  {
    id: 5,
    givenName: 'Tom',
    surname: 'Bendelow',
    birthYear: 1868,
    deathYear: 1936,
  },
  {
    id: 6,
    givenName: 'Charles Blair',
    surname: 'MacDonald',
    birthYear: 1855,
    deathYear: 1939,
  },
  {
    id: 7,
    givenName: 'A.W.',
    surname: 'Tillinghast',
    birthYear: 1876,
    deathYear: 1942,
  },
  {
    id: 8,
    givenName: 'Willie',
    surname: 'Park, Jr',
    birthYear: 1864,
    deathYear: 1925,
  },
  {
    id: 9,
    givenName: 'Seth',
    surname: 'Raynor',
    birthYear: 1874,
    deathYear: 1926,
  },
  {
    id: 10,
    givenName: 'Harry',
    surname: 'Colt',
    birthYear: 1869,
    deathYear: 1951,
  },
]

async function seedArchitects () {
  const architectProms = architects.map(architect => {
    return Architect.create(architect)
  })
  await Promise.all(architectProms)
  console.log(`Seeded ${architects.length} architect names`)
}

module.exports = seedArchitects
