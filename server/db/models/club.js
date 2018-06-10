const Sequelize = require('sequelize')
const db = require('../../db')

const Club = db.define('club', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  shortName: {
    type: Sequelize.STRING,
  },
  established: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Club
