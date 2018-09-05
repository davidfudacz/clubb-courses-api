const { Club } = require('../../server/db/models')

const clubs = [
  {
    name: 'Beverly Country Club',
    informal: 'Beverly',
    established: 1908,
    membershipTypeId: 1,
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
    established: 1916,
  },
  {
    name: 'Olympia Fields Country Club',
    informal: 'Olympia Fields',
    established: 1915,
  },
]

async function seedClubs () {
  await clubs.forEach(async club => {
    await Club.create(club)
  })
  console.log(`Seeded ${clubs.length} clubs`)
}

module.exports = seedClubs
