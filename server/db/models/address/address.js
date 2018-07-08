const Sequelize = require('sequelize')
const db = require('../../../db')

const Address = db.define('address', {
  lineOne: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  lineTwo: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
    }
  },
})

module.exports = Address
