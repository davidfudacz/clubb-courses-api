const Sequelize = require('sequelize')
const db = require('../../../db')

const Ranking = db.define('ranking', {
  rank: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true,
    }
  }
})

module.exports = Ranking
