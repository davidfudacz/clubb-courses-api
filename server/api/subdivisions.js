const router = require('express').Router()
const { Subdivison } = require('../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.subdivision = await Subdivison.findById(id, {
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
    const subdivisions = await Subdivison.findAll({
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    res.json(subdivisions)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.subdivision)
})

router.post('/', async (req, res, next) => {
  try {
    const subdivision = await Subdivison.create(req.body)
    res.json(subdivision)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedSubdivison = await Subdivison.update(req.body, {
      where: {
        id: req.subdivision.id,
      },
      returning: true,
    })
    const returningSubdivison = updatedSubdivison[1][0]
    res.json(returningSubdivison)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
