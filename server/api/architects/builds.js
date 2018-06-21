const router = require('express').Router()
const { ArchitectBuild, Build, Course, Club } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const architectId = req.architect.id
    const builds = await ArchitectBuild.findAll({
      where: {
        architectId
      },
      include: [{
        model: Build,
        include: [{
          model: Course,
          include: [ Club ],
        }],
      }]
    })
    const response = builds.map(build => {
      return {
        id: build.build.id,
        buildType: build.build.buildType,
        year: build.build.year,
        course: {
          id: build.build.course.id,
          name: build.build.course.name,
          informal: build.build.course.informal,
          numOfHoles: build.build.course.numOfHoles,
          club: {
            id: build.build.course.club.id,
            name: build.build.course.club.name,
            informal: build.build.course.club.informal,
            established: build.build.course.club.established,
          }
        }
      }
    })
    res.json(response)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
