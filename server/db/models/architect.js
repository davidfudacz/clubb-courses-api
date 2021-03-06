const Sequelize = require('sequelize')
const db = require('../db')

const Architect = db.define('architect', {
  givenName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  birthYear: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  deathYear: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  }
})

module.exports = Architect
