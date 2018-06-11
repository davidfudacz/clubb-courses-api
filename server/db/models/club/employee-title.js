const Sequelize = require('sequelize')
const db = require('../../db')

const EmployeeTitle = db.define('employeeTitle', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = EmployeeTitle