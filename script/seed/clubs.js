const { Club } = require('../../server/db/models')

const clubs = [
  {
    id: 1,
    name: 'Beverly Country Club',
    informal: 'Beverly',
    established: 1908,
  },
  {
    id: 2,
    name: 'Butler National Golf Club',
    informal: 'Butler',
    established: 1972,
  },
  {
    id: 3,
    name: 'Old Elm Club',
    informal: 'Old Elm',
    established: 1913,
  },
  {
    id: 4,
    name: 'Chicago Golf Club',
    informal: 'Chicago Golf',
    established: 1892,
  },
  {
    id: 5,
    name: 'Shoreacres',
    established: 1916,
  },
  {
    id: 6,
    name: 'Olympia Fields Country Club',
    informal: 'Olympia Fields',
    established: 1915,
  },
]

async function seedClubs () {
  const clubsProms = clubs.map(club => {
    return Club.create(club)
  })
  await Promise.all(clubsProms)
  console.log(`Seeded ${clubs.length} clubs`)
}

module.exports = seedClubs
