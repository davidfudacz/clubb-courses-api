const Sequelize = require('sequelize')
const db = require('../../../db')

const Scorecard = db.define('scorecard', {
  imgUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})

module.exports = Scorecard
