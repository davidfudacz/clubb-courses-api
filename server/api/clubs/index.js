const router = require('express').Router
const { Club } = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.club = await Club.findById(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const clubs = await Club.findAll()
    res.json(clubs)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
