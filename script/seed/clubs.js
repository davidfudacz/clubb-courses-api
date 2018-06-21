const { Club } = require('../../server/db/models')

async function seedClubs () {
  const clubsProms = clubs.map(club => {
    return Club.create(club)
  })
  await Promise.all(clubsProms)
  console.log(`Seeded ${clubs.length} clubs`)
}

const clubs = [
  {
    name: 'Beverly Country Club',
    informal: 'Beverly',
    established: 1908,
  },
  {
    name: 'Butler National Golf Club',
    informal: 'Butler',
    established: 1972,
  },
  {
    name: 'Old Elm Club',
    informal: 'Old Elm',
    established: 1913,
  },
  {
    name: 'Chicago Golf Club',
    informal: 'Chicago Golf',
    established: 1892,
  },
  {
    name: 'Shoreacres',
    informal: 'Beverly',
    established: 1916,
  },
  {
    name: 'Olympia Fields Country Club',
    informal: 'Olympia Fields',
    established: 1915,
  },
]

module.exports = seedClubs
