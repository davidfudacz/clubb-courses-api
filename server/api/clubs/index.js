const router = require('express').Router()
const {
  Club,
  Address,
  City,
  State,
  Country,
  Build,
  Architect,
  Course,
  YardageInfo,
  Tee,
} = require('../../db/models')

router.param('id', async (req, res, next, id) => {
  try {
    req.club = await Club.findById(id, {
      include: [
        {
          model: Address,
          include: [ City, State, Country ]
        },
        {
          model: Course,
          include: [
            {
              model: Build,
              include: [ Architect ]
            },
            {
              model: YardageInfo,
              include: [ Tee ]
            }
          ]
        }
      ]
    })
    next()
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const clubs = await Club.findAll({
      include: [ Course, Address ]
    })
    const response = clubs.map(({ courses, address, established, id, informal, logoUrl, membershipId, name }) => {
      const coursesArray = courses.map(course => {
        return {
          id: course.id,
          informal: course.informal,
          name: course.name,
          numOfHoles: course.numOfHoles,
        }
      })
      if (address) {
        address = {
          stateId: address.stateId,
          countryId: address.countryId,
        }
      }
      return {
        courses: coursesArray,
        address,
        established,
        id,
        informal,
        name,
        logoUrl,
        membershipId,
      }
    })
    res.json(response)
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
