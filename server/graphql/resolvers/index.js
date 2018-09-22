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
    })
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
    }
  },
  Architect: {
    fullname: architect => `${architect.givenName} ${architect.surname}`
  }
}