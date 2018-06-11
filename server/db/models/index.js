
const User = require('./user')
const Club = require('./club')
const Course = require('./course')

// clubs can have many courses, but each course only belongs to one club
Course.belongsTo(Club)
Club.hasMany(Course)

module.exports = {
  User,
  Club,
  Course,
}
