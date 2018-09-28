/* eslint complexity: 0 */
const Sequelize = require('sequelize')
const db = require('../../db')

const Club = db.define('club', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  informal: {
    type: Sequelize.STRING,
  },
  established: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  logoUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  },
  websiteUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  },
  totalNumOfHoles: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  membershipType: {
    type: Sequelize.ENUM,
    values: ['Private', 'Public', 'Resort']
  }
})

module.exports = Club
