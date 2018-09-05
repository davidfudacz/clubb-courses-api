const Sequelize = require('sequelize')
const db = require('../../../db')

const MembershipType = db.define('membershipType', {
  name: {
    type: Sequelize.ENUM,
    values: ['Private', 'Public', 'Resort']
  },
})

module.exports = MembershipType
