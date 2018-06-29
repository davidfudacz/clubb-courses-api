const Sequelize = require('sequelize')
const db = require('../../db')

const Event = db.define('event', {
  year: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
})

module.exports = Event
