const { Club } = require('../../server/db/models')

const clubs = [
  {
    name: 'Beverly Country Club',
    informal: 'Beverly',
    established: 1908,
    membershipType: 'Private',
  },
  {
    name: 'Butler National Golf Club',
    informal: 'Butler',
    established: 1972,
    membershipType: 'Private',
  },
  {
    name: 'Old Elm Club',
    informal: 'Old Elm',
    established: 1913,
    membershipType: 'Private',
  },
  {
    name: 'Chicago Golf Club',
    informal: 'Chicago Golf',
    established: 1892,
    membershipType: 'Public',
  },
  {
    name: 'Shoreacres',
    established: 1916,
    membershipType: 'Private',
  },
  {
    name: 'Olympia Fields Country Club',
    informal: 'Olympia Fields',
    established: 1915,
    membershipType: 'Resort',
  },
]

async function seedClubs () {
  await clubs.forEach(async club => {
    await Club.create(club)
  })
  console.log(`Seeded ${clubs.length} clubs`)
}

module.exports = seedClubs
