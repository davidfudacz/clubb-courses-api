const Sequelize = require('sequelize')
const db = require('../../../db')

const YardageInfo = db.define('yardageInfo', {
  frontYardage: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  backYardage: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  totalYardage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  frontPar: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  backPar: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  totalPar: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  frontRating: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
    get: function () {
      return (this.getDataValue('frontRating') / 10).toString()
    },
    set: function (rating) {
      if (!rating) this.setDataValue('') //this will pass through to the sequelize validation error
      if (typeof rating === 'number') this.setDataValue('frontRating', rating * 10)
    }
  },
  backRating: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
    get: function () {
      return (this.getDataValue('backRating') / 10).toString()
    },
    set: function (rating) {
      if (!rating) this.setDataValue('') //this will pass through to the sequelize validation error
      if (typeof rating === 'number') this.setDataValue('backRating', rating * 10)
    }
  },
  totalRating: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    },
    get: function () {
      return (this.getDataValue('totalRating') / 10).toString()
    },
    set: function (rating) {
      if (!rating) this.setDataValue('') //this will pass through to the sequelize validation error
      if (typeof rating === 'number') this.setDataValue('totalRating', rating * 10)
    }
  },
  frontSlope: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  backSlope: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
  totalSlope: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
    }
  },
})

module.exports = YardageInfo
