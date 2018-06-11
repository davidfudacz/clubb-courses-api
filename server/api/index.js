const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/clubs', require('./clubs'))
router.use('/courses', require('./courses'))

module.exports = router
