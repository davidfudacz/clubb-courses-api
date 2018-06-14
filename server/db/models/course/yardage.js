const Sequelize = require('sequelize')
const db = require('../../../db')

const Yardage = db.define('yardage', {
  yardage: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  par: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
    get: function () {
      return this.getDataValue('rating') / 10
    },
    set: function (rating) {
      if (!rating) this.setDataValue('') //this will pass through to the sequelize validation error
      if (typeof rating === 'number') this.setDataValue('rating', rating * 10)
    }
  },
  slope: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
})

module.exports = Yardage
