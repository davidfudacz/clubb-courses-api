const router = require('express').Router()
const { Player } = require('../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.player = await Player.findById(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const players = await Player.findAll()
    res.json(players)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.player)
})

module.exports = router