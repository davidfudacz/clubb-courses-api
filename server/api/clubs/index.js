const router = require('express').Router()
const { Club, Course } = require('../../db/models')

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
    const clubs = await Club.findAll({
      include: [ Course ]
    })
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
    const updatedClub = await Club.update(req.body, {
      where: {
        id: req.club.id,
      },
      returning: true,
    })
    const returningClub = updatedClub[1][0]
    res.json(returningClub)
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
