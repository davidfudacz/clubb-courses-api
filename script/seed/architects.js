const { Architect } = require('../../server/db/models')

const architects = [
  {
    givenName: 'Donald',
    surname: 'Ross',
    birthYear: 1872,
    deathYear: 1948,
  },
  {
    givenName: 'George',
    surname: 'Fazio',
    birthYear: 1912,
    deathYear: 1986,
  },
  {
    givenName: 'Robert Trent',
    surname: 'Jones',
    birthYear: 1906,
    deathYear: 2000,
  },
  {
    givenName: 'Alister',
    surname: 'MacKenzie',
    birthYear: 1870,
    deathYear: 1934,
  },
  {
    givenName: 'Tom',
    surname: 'Bendelow',
    birthYear: 1868,
    deathYear: 1936,
  },
  {
    givenName: 'Charles Blair',
    surname: 'MacDonald',
    birthYear: 1855,
    deathYear: 1939,
  },
  {
    givenName: 'A.W.',
    surname: 'Tillinghast',
    birthYear: 1876,
    deathYear: 1942,
  },
  {
    givenName: 'Willie',
    surname: 'Park, Jr',
    birthYear: 1864,
    deathYear: 1925,
  },
  {
    givenName: 'Seth',
    surname: 'Raynor',
    birthYear: 1874,
    deathYear: 1926,
  },
  {
    givenName: 'Harry',
    surname: 'Colt',
    birthYear: 1869,
    deathYear: 1951,
  },
]

async function seedArchitects () {
  await architects.forEach(async architect => {
    await Architect.create(architect)
  })
  console.log(`Seeded ${architects.length} architect names`)
}

module.exports = seedArchitects
