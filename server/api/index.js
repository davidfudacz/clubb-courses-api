const router = require('express').Router()
router.use('/courses', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  next()
})
router.use('/users', require('./users'))
router.use('/clubs', require('./clubs'))
router.use('/courses', require('./courses'))
router.use('/architects', require('./architects'))
router.use('/players', require('./players'))
router.use('/tournaments', require('./tournaments'))
router.use('/ranking-lists', require('./ranking-lists'))
router.use('/publishers', require('./publishers'))
router.use('/states', require('./states'))

module.exports = router
