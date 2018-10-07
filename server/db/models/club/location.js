/* eslint complexity: 0 */
const Sequelize = require('sequelize')
const db = require('../../db')

const Location = db.define('location', {
  lat: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  lng: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  googlePlaceId: {
    type: Sequelize.INTEGER,
  }
})

module.exports = Location
