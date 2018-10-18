const { Club } = require('../../server/db/models')

const clubs = [
  {
    id: 1,
    name: 'Beverly Country Club',
    informal: 'Beverly',
    established: 1908,
    membershipType: 'Private',
    location: 1,
  },
  {
    id: 2,
    name: 'Butler National Golf Club',
    informal: 'Butler',
    established: 1972,
    membershipType: 'Private',
    location: 3,
  },
  {
    id: 3,
    name: 'Old Elm Club',
    informal: 'Old Elm',
    established: 1913,
    membershipType: 'Private',
    location: 2,
  },
  {
    id: 4,
    name: 'Chicago Golf Club',
    informal: 'Chicago Golf',
    established: 1892,
    membershipType: 'Public',
    location: 2,
  },
  {
    id: 5,
    name: 'Shoreacres',
    established: 1916,
    membershipType: 'Private',
    location: 3,
  },
  {
    id: 6,
    name: 'Olympia Fields Country Club',
    informal: 'Olympia Fields',
    established: 1915,
    membershipType: 'Resort',
    location: 1,
  },
]

async function seedClubs () {
  try {
    console.log('seeding clubs...')
    await clubs.forEach(async club => {
      try {
        const clubCreated = await Club.create(club)
        await clubCreated.setLocation(club.location)
        console.log(`created ${clubCreated.name} with id ${clubCreated.id}` )

      } catch (err) {
        console.log(err)
      }
    })
    console.log(`Seeded ${clubs.length} clubs`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = seedClubs
