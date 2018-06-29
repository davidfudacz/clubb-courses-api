const Sequelize = require('sequelize')
const db = require('../../../db')

const FormerName = db.define('formerName', {
  name: {
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
  startYear: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  endYear: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
})

module.exports = FormerName
