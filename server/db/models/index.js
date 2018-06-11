
const User = require('./user')
const Club = require('./club')
const Course = require('./course')
const { Address, City, State, Country } = require('./address')

// clubs can have many courses, but each course only belongs to one club
Course.belongsTo(Club)
Club.hasMany(Course)

Address.belongsTo(City)
Address.belongsTo(State)
Address.belongsTo(Country)

Club.belongsTo(Address)

module.exports = {
  User,
  Club,
  Course,
  Address,
  City,
  State,
  Country,
}
