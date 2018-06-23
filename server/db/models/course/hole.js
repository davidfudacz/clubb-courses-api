const Sequelize = require('sequelize')
const db = require('../../../db')

const Hole = db.define('hole', {
  number: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  yardage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  par: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  mensHandicap: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  womensHandicap: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  }
})

module.exports = Hole
