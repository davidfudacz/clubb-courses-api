/* eslint complexity: 0 */
const {
  Club,
  Course,
  Architect,
  Build,
  ArchitectBuild,
  Publisher,
  RankingList,
  RankingListName,
  Ranking,
  Location,
  City,
  Subdivision,
  Country,
} = require('../../db/models')

const locationParser = async (location, isAbbreviated) => {
  const city = await City.findById(location.cityId)
  const subdivision = await Subdivision.findById(location.subdivisionId)
  const country = await Country.findById(location.countryId)
  if (isAbbreviated) {
    const parsedCountry = country && country.abbreviation ? ` (${country.abbreviation})` : ''
    const parsedSubdivision = subdivision && subdivision.abbreviation ? `, ${subdivision.abbreviation}` : ''
    return city.name + parsedSubdivision + parsedCountry
  }
  const parsedSubdivision = subdivision && subdivision.name ? `, ${subdivision.name}` : ''
  const parsedCountry = country && country.informal ? ` (${country.informal})` : ''
  return city.name + parsedSubdivision + parsedCountry
}

module.exports = {
  Query: {
    clubs: () => Club.findAll(),
    club: (parent, { id }) => Club.findById(id),
    courses: () => Course.findAll(),
    course: (parent, { id }) => Course.findById(id),
    architects: () => Architect.findAll(),
    architect: (parent, { id }) => Architect.findById(id),
    publishers: () => Publisher.findAll(),
    publisher: (parent, { id }) => Publisher.findById(id),
    rankingLists: () => RankingList.findAll({ order: [['year', 'DESC']]}),
    rankingList: (parent, { id }) => RankingList.findById(id),
    location: (parent, { id }) => Location.findById(id),
    city: (parent, { id }) => City.findById(id),
    subdivisions: () => Subdivision.findAll(),
    countries: () => Country.findAll(),
  },
  Club: {
    courses: ({ id }) => Course.findAll({
      where: {
        clubId: id
      }
    }),
    location: ({ locationId }) => Location.findById(locationId),
    parsedLocation: async ({ locationId }) => {
      if (locationId) {
        const location = await Location.findById(locationId)
        if (location.cityId) {
          return locationParser(location)
        }
      }
    },
  },
  Course: {
    builds: ({ id }) => Build.findAll({
      where: {
        courseId: id
      }
    }),
    originalBuild: ({ id }) => Build.findOne({
      where: {
        courseId: id,
        buildType: 'original',
      }
    }),
    club: ({ clubId }) => Club.findById(clubId),
    parsedName: async ({ name, clubId }) => {
      const club = await Club.findById(clubId)
      return `${club.name}${name ? ' - ' + name : ''}`
    },
    parsedNameInformal: async ({ name, informal, clubId }) => {
      const club = await Club.findById(clubId)
      let clubName = club.informal ? club.informal : club.name
      if (name) {
        clubName += informal ? ` (${informal})` : ` (${name})`
      }
      return clubName
    },
    parsedLocation: async ({ clubId }) => {
      const { locationId } = await Club.findById(clubId)
      if (locationId) {
        const location = await Location.findById(locationId)
        if (location.cityId) {
          return locationParser(location)
        }
      }
    },
    parsedLocationAbbreviated: async ({ clubId }) => {
      const { locationId } = await Club.findById(clubId)
      if (locationId) {
        const location = await Location.findById(locationId)
        if (location.cityId) {
          return locationParser(location, true)
        }
      }
    },
  },
  Build: {
    architects: ({ id }) => {
      const architectBuilds = ArchitectBuild.findAll({
        where: {
          buildId: id
        }
      })
      const architects = architectBuilds.map(({ architectId }) => {
        return Architect.findById(architectId)
      })
      return architects
    },
    course: ({ courseId }) => Course.findById(courseId)
  },
  Architect: {
    fullname: ({ givenName, surname }) => `${givenName} ${surname}`,
    builds: ({ id }) => {
      const architectBuilds = ArchitectBuild.findAll({
        where: {
          architectId: id
        }
      })
      const builds = architectBuilds.map(({ buildId }) => {
        return Build.findById(buildId)
      })
      return builds
    }
  },
  Publisher: {
    rankingLists: ({ id }) => RankingList.findAll({
      where: {
        publisherId: id,
      }
    })
  },
  RankingList: {
    publisher: ({ publisherId }) => Publisher.findById(publisherId),
    rankings: ({ id }) => Ranking.findAll({
      where: {
        rankingListId: id
      },
      order: [
        ['rank', 'ASC']
      ]
    }),
    rankingListName: ({ rankingListNameId }) => RankingListName.findById(rankingListNameId),
    parsedName: async ({ rankingListNameId, year }) => {
      const { name } = await RankingListName.findById(rankingListNameId)
      return `${year} - ${name}`
    },
    parsedNameInformal: async ({ rankingListNameId, year }) => {
      const { informal, name } = await RankingListName.findById(rankingListNameId)
      return `${year} - ${informal ? informal : name}`
    },
  },
  Ranking: {
    course: ({ courseId }) => Course.findById(courseId)
  },
  Location: {
    city: ({ cityId }) => City.findById(cityId),
    subdivision: ({ subdivisionId }) => Subdivision.findById(subdivisionId),
    country: ({ countryId }) => Country.findById(countryId),
  },
  City: {
    subdivision: ({ subdivisionId }) => Subdivision.findById(subdivisionId),
  },
  Subdivision: {
    cities: ({ id }) => City.findAll({
      where: {
        subdivisionId: id
      }
    })
  },
  Country: {
    subdivisions: ({ id }) => Subdivision.findAll({
      where: {
        countryId: id
      }
    })
  },
}
