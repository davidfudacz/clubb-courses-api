const router = require('express').Router()
const { Architect, Course } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const courseId = req.course.id
    const architects = await Architect.findAll({
      include: [
        {
          model: Course,
          where: {
            id: courseId
          },
          attributes: ['id'],
        }
      ]
    })
    res.json(architects)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
