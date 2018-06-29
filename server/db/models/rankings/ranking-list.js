const Sequelize = require('sequelize')
const db = require('../../../db')

const RankingList = db.define('rankingList', {
  year: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
})

module.exports = RankingList
