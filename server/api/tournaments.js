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

router.post('/', async (req, res, next) => {
  try {
    const tournament = await Tournament.create(req.body)
    res.json(tournament)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedTournament = await Tournament.update(req.body, {
      where: {
        id: req.tournament.id,
      },
      returning: true,
    })
    const returningTournament = updatedTournament[1][0]
    res.json(returningTournament)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
