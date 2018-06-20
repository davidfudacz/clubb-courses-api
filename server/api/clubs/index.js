const router = require('express').Router()
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

router.post('/', async (req, res, next) => {
  try {
    const club = req.body
    const createdClub = await Club.create(club)
    res.json(createdClub)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const club = req.body
    await req.club.update(club)
    res.json(req.club)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.club)
})

router.use('/:id/courses', require('./courses'))
router.use('/:id/employees', require('./employees'))

module.exports = router
