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

router.post('/', async (req, res, next) => {
  try {
    const player = await Player.create(req.body)
    res.json(player)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedPlayer = await Player.update(req.body, {
      where: {
        id: req.player.id,
      },
      returning: true,
    })
    const returningPlayer = updatedPlayer[1][0]
    res.json(returningPlayer)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
