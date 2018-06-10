const Sequelize = require('sequelize')
const db = require('../../db')

const Course = db.define('course', {
  name: {
    type: Sequelize.STRING,
  },
  shortName: {
    type: Sequelize.STRING,
  },
  built: {
    type: Sequelize.INTEGER,
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
