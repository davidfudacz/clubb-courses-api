const Sequelize = require('sequelize')
const db = require('../../db')

const Nationality = db.define('nationality', {
  flagImgUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  }
})

module.exports = Nationality
