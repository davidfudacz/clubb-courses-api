const Sequelize = require('sequelize')
const db = require('../../../db')

const Membership = db.define('membership', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = Membership
