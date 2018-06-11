const Sequelize = require('sequelize')
const db = require('../../../db')

const Course = db.define('course', {
  name: {
    type: Sequelize.STRING,
  },
  informal: {
    type: Sequelize.STRING,
  },
  built: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  numOfHoles: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
})

module.exports = Course
