const Sequelize = require('sequelize')
const db = require('../../db')

const Employee = db.define('employee', {
  givenName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  startYear: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  endYear: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  }
})

module.exports = Employee
