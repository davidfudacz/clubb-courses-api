const router = require('express').Router()
const { List, ListName, Publisher } = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.list = await List.findById(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const lists = await List.findAll({
      include: [ ListName, Publisher ]
    })
    res.json(lists)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.list)
})

router.post('/', async (req, res, next) => {
  try {
    const list = await List.create(req.body)
    res.json(list)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedList = await List.update(req.body, {
      where: {
        id: req.list.id,
      },
      returning: true,
    })
    const returningList = updatedList[1][0]
    res.json(returningList)
  }
  catch (err) {
    next(err)
  }
})

router.use('/:id/rankings', require('./rankings'))

module.exports = router
