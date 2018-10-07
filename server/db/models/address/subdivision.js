const Sequelize = require('sequelize')
const db = require('../..')

const Subdivision = db.define('subdivision', {
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

module.exports = Subdivision
