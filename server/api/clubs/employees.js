const router = require('express').Router()
const { Employee, Club } = require('../../db/models')

router.get('/', async (req, res, next) => {
  try {
    const clubId = req.club.id
    const employees = await Employee.findAll({
      include: [
        {
          model: Club,
          where: {
            id: clubId
          },
          attributes: ['id'],
        }
      ]
    })
    res.json(employees)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const clubId = req.club.id
    const employee = await Employee.create(req.body)
    await employee.addClub(clubId)
    res.json(employee)
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
