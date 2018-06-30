const router = require('express').Router()
const { Publisher } = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.publisher = await Publisher.findById(id, {
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
    const publishers = await Publisher.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    res.json(publishers)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedPublisher = await Publisher.update(req.body, {
      where: {
        id: req.publisher.id,
      },
      returning: true,
    })
    const returningPublisher = updatedPublisher[1][0]
    res.json(returningPublisher)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.publisher)
})

router.use('/:id/ranking-lists', require('./ranking-lists'))

module.exports = router
