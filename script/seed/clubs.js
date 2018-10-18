const { Club } = require('../../server/db/models')

const clubs = [
  {
    id: 1,
    name: 'Beverly Country Club',
    informal: 'Beverly',
    established: 1908,
    membershipType: 'Private',
  },
  {
    id: 2,
    name: 'Butler National Golf Club',
    informal: 'Butler',
    established: 1972,
    membershipType: 'Private',
  },
  {
    id: 3,
    name: 'Old Elm Club',
    informal: 'Old Elm',
    established: 1913,
    membershipType: 'Private',
  },
  {
    id: 4,
    name: 'Chicago Golf Club',
    informal: 'Chicago Golf',
    established: 1892,
    membershipType: 'Public',
  },
  {
    id: 5,
    name: 'Shoreacres',
    established: 1916,
    membershipType: 'Private',
  },
  {
    id: 6,
    name: 'Olympia Fields Country Club',
    informal: 'Olympia Fields',
    established: 1915,
    membershipType: 'Resort',
  },
]

async function seedClubs () {
  await clubs.forEach(async club => {
    const clubCreated = await Club.create(club)
    console.log(`created ${clubCreated.name} with id ${clubCreated.id}` )
  })
  console.log(`Seeded ${clubs.length} clubs`)
}

module.exports = seedClubs
