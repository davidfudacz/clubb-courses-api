const router = require('express').Router()
const { State } = require('../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.state = await State.findById(id, {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const states = await State.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    res.json(states)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.state)
})

router.post('/', async (req, res, next) => {
  try {
    const state = await State.create(req.body)
    res.json(state)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedState = await State.update(req.body, {
      where: {
        id: req.state.id,
      },
      returning: true,
    })
    const returningState = updatedState[1][0]
    res.json(returningState)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
