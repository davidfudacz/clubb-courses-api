const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/clubs', require('./clubs'))
router.use('/courses', require('./courses'))
router.use('/architects', require('./architects'))
router.use('/players', require('./players'))
router.use('/tournaments', require('./tournaments'))

module.exports = router
