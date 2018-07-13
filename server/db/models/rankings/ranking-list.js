const Sequelize = require('sequelize')
const db = require('../../../db')

const RankingList = db.define('rankingList', {
  year: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
})

module.exports = RankingList
