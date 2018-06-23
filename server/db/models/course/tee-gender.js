const Sequelize = require('sequelize')
const db = require('../../../db')

const TeeGender = db.define('teeGender', {
  formal: {
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
  abbreviation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = TeeGender
