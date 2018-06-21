const router = require('express').Router()
const { Employee, Club, EmployeeTitle } = require('../../db/models')

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
        },
        EmployeeTitle
      ]
    })
    const response = employees.map(employee => {
      const title = employee.employeeTitle ? employee.employeeTitle.title : null
      const informal = employee.employeeTitle ? employee.employeeTitle.informal : null
      return {
        id: employee.id,
        givenName: employee.givenName,
        surname: employee.surname,
        email: employee.email,
        startYear: employee.startYear,
        endYear: employee.endYear,
        imgUrl: employee.imgUrl,
        employeeTitle: {
          title,
          informal
        },
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
