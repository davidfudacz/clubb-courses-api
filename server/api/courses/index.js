const router = require('express').Router()
const { Course } = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.course = await Course.findById(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.findAll()
    res.json(courses)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCourse = await Course.update(req.body, {
      where: {
        id: req.course.id,
      },
      returning: true,
    })
    const returningCourse = updatedCourse[1][0]
    res.json(returningCourse)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.course)
})

router.use('/:id/builds', require('./builds'))

module.exports = router
