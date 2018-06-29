const Sequelize = require('sequelize')
const db = require('../../../db')

const RankingListName = db.define('rankingListName', {
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
})

module.exports = RankingListName
