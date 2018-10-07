const { Subdivision } = require('../../server/db/models')

const subdivisions = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
    countryId: 1,
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
    countryId: 1,
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
    countryId: 1,
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
    countryId: 1,
  },
  {
    name: 'California',
    abbreviation: 'CA',
    countryId: 1,
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
    countryId: 1,
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
    countryId: 1,
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
    countryId: 1,
  },
  {
    name: 'District of Columbia',
    abbreviation: 'DC',
    countryId: 1,
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
    countryId: 1,
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
    countryId: 1,
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
    countryId: 1,
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
    countryId: 1,
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
    countryId: 1,
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
    countryId: 1,
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
    countryId: 1,
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
    countryId: 1,
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
    countryId: 1,
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
    countryId: 1,
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
    countryId: 1,
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
    countryId: 1,
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
    countryId: 1,
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
    countryId: 1,
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
    countryId: 1,
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
    countryId: 1,
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
    countryId: 1,
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
    countryId: 1,
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
    countryId: 1,
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
    countryId: 1,
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
    countryId: 1,
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
    countryId: 1,
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
    countryId: 1,
  },
  {
    name: 'New York',
    abbreviation: 'NY',
    countryId: 1,
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
    countryId: 1,
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
    countryId: 1,
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
    countryId: 1,
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
    countryId: 1,
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
    countryId: 1,
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    countryId: 1,
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
    countryId: 1,
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
    countryId: 1,
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
    countryId: 1,
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
    countryId: 1,
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
    countryId: 1,
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
    countryId: 1,
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
    countryId: 1,
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
    countryId: 1,
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
    countryId: 1,
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
    countryId: 1,
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
    countryId: 1,
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
    countryId: 1,
  },
  {
    name: 'British Columbia',
    abbreviation: 'BC',
    countryId: 2,
  }
]

  async function seedSubdivisions () {
    const subdivisionsProms = subdivisions.map(subdivision => {
      return Subdivision.create(subdivision)
    })
    await Promise.all(subdivisionsProms)
    console.log(`Seeded ${subdivisions.length} subdivisions`)
  }

  module.exports = seedSubdivisions
