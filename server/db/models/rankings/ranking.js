const Sequelize = require('sequelize')
const db = require('../../../db')

const Ranking = db.define('ranking', {
  rank: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  }
})

module.exports = Ranking
