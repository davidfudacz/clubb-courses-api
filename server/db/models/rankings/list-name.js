const Sequelize = require('sequelize')
const db = require('../../../db')

const ListName = db.define('listName', {
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

module.exports = ListName
