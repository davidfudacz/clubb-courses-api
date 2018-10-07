const { Country } = require('../../server/db/models')

const countries = [
  {
    name: 'United States of America',
    informal: 'United States',
    abbreviation: 'USA',
    demonym: 'American',
    demonymPlural: 'Americans',
  },
  {
    name: 'Canada',
    abbreviation: 'CAN',
    demonym: 'Canadian',
    demonymPlural: 'Canadians',
  }]

  async function seedCountries () {
    const countriesProms = countries.map(subdivision => {
      return Country.create(subdivision)
    })
    await Promise.all(countriesProms)
    console.log(`Seeded ${countries.length} countries`)
  }

  module.exports = seedCountries
