const Sequelize = require('sequelize')
const db = require('../../db')

const Address = db.define('address', {
  street: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  street2: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING,
  },
})

module.exports = Address
