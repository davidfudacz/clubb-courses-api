const Sequelize = require('sequelize')
const db = require('../../../db')

const List = db.define('list', {
  year: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
})

module.exports = List
