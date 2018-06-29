const router = require('express').Router()
const { Architect, Build } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const courseId = req.course.id
    const builds = await Build.findAll({
      where: {
        courseId
      },
      include: [Architect],
      order: ['year']
    })
    res.json(builds)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const courseId = req.course.id
    const build = await Build.create(req.body)
    await build.setCourse(courseId)
    res.json(build)
  }
  catch (err) {
    next(err)
  }
})

router.post('/:id/architects', async (req, res, next) => {
  try {
    const buildId = req.params.id
    const architects = req.body
    const build = await Build.findById(buildId)
      await build.addArchitects(architects)
    const updatedBuild = await Build.findById(buildId, {
      include: [Architect]
    })
    res.json(updatedBuild)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
