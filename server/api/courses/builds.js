const router = require('express').Router()
const { Architect, Build } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const courseId = req.course.id
    const builds = await Build.findAll({
      where: {
        courseId
      },
      include: [Architect]
    })
    res.json(builds)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
