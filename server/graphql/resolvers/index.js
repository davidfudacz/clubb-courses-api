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
    courses: club => Course.findAll({
      where: {
        clubId: club.id
      }
    }),
    location: club => Location.findById(club.locationId)
  },
  Course: {
    builds: course => Build.findAll({
      where: {
        courseId: course.id
      }
    }),
    originalBuild: async course => {
      const build = await Build.findOne({
        where: {
          courseId: course.id,
          buildType: 'original',
        }
      })
      const year = build.year
      return year
    },
    club: course => Club.findById(course.clubId)
  },
  Build: {
    architects: build => {
      const architectBuilds = ArchitectBuild.findAll({
        where: {
          buildId: build.id
        }
      })
      const architects = architectBuilds.map(architectBuild => {
        return Architect.findById(architectBuild.architectId)
      })
      return architects
    },
    course: build => Course.findById(build.courseId)
  },
  Architect: {
    fullname: architect => `${architect.givenName} ${architect.surname}`,
    builds: architect => {
      const architectBuilds = ArchitectBuild.findAll({
        where: {
          architectId: architect.id
        }
      })
      const builds = architectBuilds.map(architectBuild => {
        return Build.findById(architectBuild.buildId)
      })
      return builds
    }
  },
  RankingList: {
    publisher: rankingList => Publisher.findById(rankingList.publisherId),
    rankings: rankingList => {
      return Ranking.findAll({
        where: {
          rankingListId: rankingList.id
        },
        order: [
          ['rank', 'ASC']
        ]
      })
    },
    rankingListName: rankingList => RankingListName.findById(rankingList.rankingListNameId)
  },
  Ranking: {
    course: ranking => Course.findById(ranking.courseId)
  },
  Location: {
    city: location => City.findById(location.cityId),
    subdivision: location => Subdivision.findById(location.subdivisionId),
    country: location => Country.findById(location.countryId),
  },
  City: {
    subdivision: city => Subdivision.findById(city.subdivisionId),
  },
  Subdivision: {
    cities: subdivision => City.findAll({
      where: {
        subdivisionId: subdivision.id
      }
    })
  },
  Country: {
    subdivisions: country => Subdivision.findAll({
      where: {
        countryId: country.id
      }
    })
  },
}
