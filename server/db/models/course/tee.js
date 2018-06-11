const Sequelize = require('sequelize')
const db = require('../../../db')

const Tee = db.define('tee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = Tee
