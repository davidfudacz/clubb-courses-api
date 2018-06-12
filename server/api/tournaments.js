const router = require('express').Router()
const { Tournament } = require('../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.tournament = await Tournament.findById(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const tournaments = await Tournament.findAll()
    res.json(tournaments)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.tournament)
})

module.exports = router