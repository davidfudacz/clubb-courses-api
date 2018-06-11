
const User = require('./user')
const { Club, Employee, EmployeeTitle } = require('./club')
const { Course, Tee, Yardage } = require('./course')
const { Address, City, State, Country } = require('./address')

// clubs can have many courses, but each course only belongs to one club
Course.belongsTo(Club)
Club.hasMany(Course)

Address.belongsTo(City)
Address.belongsTo(State)
Address.belongsTo(Country)
State.belongsTo(Country)

Club.belongsTo(Address)

module.exports = {
  User,
  Club,
  Employee,
  EmployeeTitle,
  Course,
  Tee,
  Yardage,
  Address,
  City,
  State,
  Country,
}
