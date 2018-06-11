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
    established: '1908',
  },
  {
    name: 'Butler Golf Club',
    informal: 'Butler',
    established: '1974',
  },
  {
    name: 'Old Elm Club',
    informal: 'Old Elm',
    established: '1912',
  },
]

module.exports = seedClubs
