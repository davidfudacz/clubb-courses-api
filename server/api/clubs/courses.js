const router = require('express').Router()
const { Course } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const clubId = req.club.id
    const courses = await Course.findAll({
      where: {
        clubId,
      }
    })
    res.json(courses)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
