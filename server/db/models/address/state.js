const Sequelize = require('sequelize')
const db = require('../../db')

const State = db.define('state', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  abbreviation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
})

module.exports = State
