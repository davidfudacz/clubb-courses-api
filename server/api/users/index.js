const router = require('express').Router
const { User } = require('../../db/models')


// maybe this isn't good cause passport has alreay set req.user??
router.param('id', async (req, res, next, id) => {
  try {
    req.user = await User.findAll(id)
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll()
    res.json(user)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
