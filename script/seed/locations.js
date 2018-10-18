const { Location, City, Subdivision } = require('../../server/db/models')

const locations = [
  {
    name: 'Chicago',
    subdivisionId: 14,
  },
  {
    name: 'New York',
    subdivisionId: 43,
  },
  {
    name: 'Vancouver',
    subdivisionId: 41,
  }
]

async function seedLocations () {
  let createdLocations
  try {
    createdLocations = await locations.map(async location => {
      const cityCreated = await City.create(location)
      const subdivision = await Subdivision.findById(location.subdivisionId)
      await Location.create({
        cityId: cityCreated.id,
        subdivisionId: cityCreated.subdivisionId,
        countryId: subdivision.countryId,
      })
    })
    console.log(`seeded ${locations.length} locations`)
  } catch (err) {
    console.log(err)
  }
  await Promise.all(createdLocations)
  const allLocations = await Location.findAll()
  allLocations.forEach(location => console.log(location.dataValues))
}

module.exports = seedLocations
