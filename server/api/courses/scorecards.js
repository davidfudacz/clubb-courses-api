const router = require('express').Router()
const { Scorecard } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const courseId = req.course.id
    const scorecards = await Scorecard.findAll({
      where: {
        courseId
      },
      order: [ 'updatedAt' ]
    })
    console.log(scorecards.dataValues)
    res.json(scorecards)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const courseId = req.course.id
    const scorecard = await Scorecard.create(req.body)
    await scorecard.setCourse(courseId)
    res.json(scorecard)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
