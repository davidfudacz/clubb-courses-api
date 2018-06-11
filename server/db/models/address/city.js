const Sequelize = require('sequelize')
const db = require('../../../db')

const City = db.define('city', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = City
