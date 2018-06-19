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
  informal: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
})

module.exports = EmployeeTitle
