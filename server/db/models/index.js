
const User = require('./user')
const { Club, Employee, EmployeeTitle, Membership } = require('./club')
const { Course, Tee, YardageInfo, Build, TeeGender, Hole } = require('./course')
const { Address, City, State, Country } = require('./address')
const { Publisher, List, Ranking } = require('./rankings')
const { Player, Nationality } = require('./player')
const { Tournament, Event, FormerName } = require('./tournament')
const Architect = require('./architect')
const ArchitectBuild = require('./architectBuild')

// clubs can have many courses, but each course only belongs to one club
Course.belongsTo(Club)
Club.hasMany(Course)

Course.hasMany(Build)
Build.belongsTo(Course)

Build.belongsToMany(Architect, { through: ArchitectBuild })
Architect.belongsToMany(Build, { through: ArchitectBuild })

Architect.hasMany(ArchitectBuild)
Build.hasMany(ArchitectBuild)

ArchitectBuild.belongsTo(Architect)
ArchitectBuild.belongsTo(Build)

Club.belongsToMany(Employee, { through: 'clubEmployees' })
Employee.belongsToMany(Club, { through: 'clubEmployees' })

Course.hasMany(Event)
Event.belongsTo(Course)

Course.hasMany(YardageInfo)
YardageInfo.belongsTo(Course)

YardageInfo.hasMany(Hole)
Hole.belongsTo(YardageInfo)

Tee.hasMany(YardageInfo)
YardageInfo.belongsTo(Tee)

TeeGender.hasMany(YardageInfo)
YardageInfo.belongsTo(TeeGender)

Tournament.hasMany(Event)
Event.belongsTo(Tournament)

Tournament.hasMany(FormerName)
FormerName.belongsTo(Tournament)

Employee.belongsTo(EmployeeTitle)

Address.belongsTo(City)
Address.belongsTo(State)
Address.belongsTo(Country)
State.belongsTo(Country)
City.belongsTo(State)

Club.belongsTo(Address)
Club.belongsTo(Membership)

Player.belongsTo(City, { as: 'hometown' })
Player.belongsTo(Nationality)

Nationality.belongsTo(Country)

Event.belongsTo(Player, { as: 'winner' })
// Player.hasMany(Event, { as: 'wins' })

List.belongsTo(Publisher)
Publisher.hasMany(List)

Ranking.belongsTo(List)
List.hasMany(Ranking)

Ranking.belongsTo(Course)
Course.hasMany(Ranking)

module.exports = {
  User,
  Club,
  Employee,
  EmployeeTitle,
  Membership,
  Course,
  Tee,
  TeeGender,
  Hole,
  YardageInfo,
  Build,
  Address,
  City,
  State,
  Country,
  Architect,
  ArchitectBuild,
  Tournament,
  Event,
  FormerName,
  Player,
  Nationality,
  Publisher,
  List,
  Ranking,
}
