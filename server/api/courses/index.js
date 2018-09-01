const router = require('express').Router()
const { Course, Club, Build } = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.course = await Course.findById(id, {
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

router.get('/:id', async (req, res, next) => {
  if (req.query.include && req.query.include.split(',').includes('club')) {
    const club = await Club.findById(req.course.clubId, {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    req.course.dataValues.club = club.dataValues
  }
  next()
})

router.get('/:id', async (req, res, next) => {
  if (req.query.include === 'club') {
    const club = await Club.findById(req.course.clubId, {
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    })
    req.course.dataValues.club = club.dataValues
  }
  next()
})

router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [ Club, Build ]
    })
    const response = courses.map(({ id, builds, informal, name, numOfHoles, club }) => {
      const clubObj = {
        id: club.id,
        established: club.established,
        informal: club.informal,
        name: club.name,
        logoUrl: club.logoUrl,
      }
      //get the year of the original build
      let yearOriginallyBuilt = null
      if (builds.length) {
        yearOriginallyBuilt = builds.find(({ buildType }) => {
          if (buildType === 'original') return true
        })
        .year
      }
      return {
        id,
        informal,
        name,
        numOfHoles,
        yearOriginallyBuilt,
        club: clubObj,
      }
    })
    
    res.json(response)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCourse = await Course.update(req.body, {
      where: {
        id: req.course.id,
      },
      returning: true,
    })
    const returningCourse = updatedCourse[1][0]
    res.json(returningCourse)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  res.json(req.course)
})

router.use('/:id/builds', require('./builds'))
router.use('/:id/scorecards', require('./scorecards'))

module.exports = router
