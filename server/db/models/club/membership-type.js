const Sequelize = require('sequelize')
const db = require('../../../db')

const MembershipType = db.define('membershipType', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = MembershipType
