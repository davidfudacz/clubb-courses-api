/* eslint complexity: 0 */
const router = require('express').Router()
const {
  Club,
  MembershipTypes,
  Address,
  City,
  State,
  Country,
  Build,
  Architect,
  Course,
  YardageInfo,
  Tee,
  TeeGender,
  Hole,
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
              include: [ Tee, Hole, TeeGender ]
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
    const response = clubs.map(({ courses, address, established, id, informal, logoUrl, membershipTypeId, name }) => {
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
        membershipTypeId,
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
    const {
      name,
      established,
      membershipType,
      lineOne,
      city,
      state,
      zip,
      country,
      yearCourseBuilt,
      architects,
      numOfHoles,
      courses,
    } = req.body
    const club = {
      name,
      established,
    }
    const createdClub = await Club.create(club)
    if (courses) {
      courses.forEach(async ({ architects, yearCourseBuilt, numOfHoles, name }) => {
        const course = await Course.create({ name, numOfHoles })
        await course.setClub(createdClub.id)
        const build = await Build.create({
          buildType: 'original',
          year: yearCourseBuilt,
          numOfHoles,
        })
        const architectIds = architects.map(({ id }) => id)
        await build.addArchitects(architectIds)
        await build.setCourse(course)
      })
    }
    if (numOfHoles) {
      const course = await Course.create({ numOfHoles })
      await course.setClub(createdClub.id)
      const build = await Build.create({
        buildType: 'original',
        year: yearCourseBuilt,
        numOfHoles,
      })
      const architectIds = architects.map(({ id }) => id)
      await build.addArchitects(architectIds)
      await build.setCourse(course)
    }
    if (lineOne && city && state && zip) {
      const address = await Address.create({
        lineOne,
        zip,
      })
      const createdCity = await City.findOrCreate({
        where: {
          name: city
        }
      })
      await address.setCity(createdCity[0])
      await address.setState(state)
      await createdClub.setAddress(address)
    }
    if (membershipType) {
      const membershipTypeInstance = await MembershipTypes.findOne({
        where: {
          name: membershipType,
        }
      })
      await createdClub.setMembershipTypes(membershipTypeInstance)
    }
    res.status(201)
    res.send(createdClub)
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
