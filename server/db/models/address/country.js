const Sequelize = require('sequelize')
const db = require('../../db')

const Country = db.define('country', {
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

module.exports = Country
