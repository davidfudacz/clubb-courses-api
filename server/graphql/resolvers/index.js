const {
  Club,
  Course,
  Architect,
  Build,
  ArchitectBuild,
} = require('../../db/models')

module.exports = {
  Query: {
    clubs: () => Club.findAll(),
    club: (parent, { id }) => Club.findById(id),
    courses: () => Course.findAll(),
    course: (parent, { id }) => Course.findById(id),
    architects: () => Architect.findAll(),
    architect: (parent, { id }) => Architect.findById(id),
  },
  Club: {
    courses: club => Course.findAll({
      where: {
        clubId: club.id
      }
    })
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
  }
}
