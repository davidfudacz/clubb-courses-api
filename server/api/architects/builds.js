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
    const response = builds.map(({ build }) => {
      const { id, buildType, year, course } = build
      return {
        id,
        buildType,
        year,
        course: {
          id: course.id,
          name: course.name,
          informal: course.informal,
          numOfHoles: course.numOfHoles,
          club: {
            id: course.club.id,
            name: course.club.name,
            informal: course.club.informal,
            established: course.club.established,
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
