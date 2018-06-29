const Sequelize = require('sequelize')
const db = require('../../../db')

const List = db.define('list', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  informal: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  year: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
})

module.exports = List
