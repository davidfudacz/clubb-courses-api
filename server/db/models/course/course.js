const Sequelize = require('sequelize')
const db = require('../../../db')

const Course = db.define('course', {
  name: {
    type: Sequelize.STRING,
  },
  informal: {
    type: Sequelize.STRING,
  },
  numOfHoles: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  }
})

module.exports = Course
