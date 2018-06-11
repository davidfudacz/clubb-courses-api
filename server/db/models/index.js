
const User = require('./user')
const { Club, Employee, EmployeeTitle } = require('./club')
const { Course, Tee, Yardage } = require('./course')
const { Address, City, State, Country } = require('./address')
const Architect = require('./architect')
const Tournament = require('./tournament')
const Event = require('./event')

// clubs can have many courses, but each course only belongs to one club
Course.belongsTo(Club)
Club.hasMany(Course)

Course.belongsToMany(Architect, { through: 'courseArchitects' })
Architect.belongsToMany(Course, { through: 'courseArchitects' })

Course.hasMany(Event)
Event.belongsTo(Course)

Course.hasMany(Yardage)
Yardage.belongsTo(Course)

Tournament.hasMany(Event)
Event.belongsTo(Tournament)

Employee.belongsTo(EmployeeTitle)

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
  Architect,
  Tournament,
  Event,
}
