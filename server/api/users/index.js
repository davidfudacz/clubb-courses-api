const router = require('express').Router()
const { User } = require('../../db/models')


// maybe this isn't good cause passport has alreay set req.user??
router.param('id', async (req, res, next, id) => {
  try {
    req.user = await User.findById(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.user)
})

module.exports = router
