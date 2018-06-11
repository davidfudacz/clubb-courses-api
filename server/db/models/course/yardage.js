const Sequelize = require('sequelize')
const db = require('../../../db')

const Yardage = db.define('yardage', {
  yardage: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  par: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get: function () {
      return this.getDataValue('rating') / 10
    },
    set: function (rating) {
      this.setDataValue('rating', rating * 10)
    }
  },
  slope: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

module.exports = Yardage
