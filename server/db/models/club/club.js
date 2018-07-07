/* eslint complexity: 0 */
const Sequelize = require('sequelize')
const db = require('../../db')

const Club = db.define('club', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set: function (name) {
      const cleanName = name.trim().split(' ')
      let output = ''
      for (let i = 0; i < cleanName.length; i++) {
        const prevWord = i ? cleanName[i-1].toLowerCase() : null
        const nextWord = i - cleanName.length + 1 ? cleanName[i+1].toLowerCase() : null
        const curElem = cleanName[i]
        const lowerElem = curElem.toLowerCase()
        console.log(lowerElem)
        switch (lowerElem) {
          case 'the':
            if (i === 0) continue
            output += `${curElem} `
            break
          case 'golf':
            if (nextWord === 'club') {
              output += 'G'
            }
            else {
              output += `${curElem} `
            }
            break
          case 'country':
            if (nextWord === 'club') {
              output += `C`
            }
            else {
              output += `${curElem} `
            }
            break
          case 'club':
            if (prevWord === 'golf' || prevWord === 'country') {
              output += `C`
            }
            else {
              output += `${curElem} `
            }
            break
          default:
            output += `${curElem} `
        }
      }
      this.setDataValue('informal', output.trim())
      this.setDataValue('name', name)
    }
  },
  informal: {
    type: Sequelize.STRING,
  },
  established: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true
    }
  },
  logoUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  },
  websiteUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    }
  }
})

module.exports = Club
