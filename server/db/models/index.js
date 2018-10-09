
const User = require('./user')
const { Club, Employee, EmployeeTitle, Location } = require('./club')
const { Course, Tee, TeeYardage, Build, TeeGender, Hole, Scorecard } = require('./course')
const { Address, City, Subdivision, Country } = require('./address')
const { Publisher, RankingList, RankingListName, Ranking } = require('./rankings')
const { Player, Nationality } = require('./player')
const { Tournament, Event, FormerName } = require('./tournament')
const Architect = require('./architect')
const ArchitectBuild = require('./architectBuild')

// clubs can have many courses, but each course only belongs to one club
Course.belongsTo(Club)
Club.hasMany(Course)

// courses can have multiple builds, builds belong to one course
Course.hasMany(Build)
Build.belongsTo(Course)

// courses can have multiple scorecards, scorecards belong to one course
Course.hasMany(Scorecard)
Scorecard.belongsTo(Course)

// architects can have multiple builds, and any one build can have multiple architects
Build.belongsToMany(Architect, { through: ArchitectBuild })
Architect.belongsToMany(Build, { through: ArchitectBuild })

// association for eager loading
Architect.hasMany(ArchitectBuild)
Build.hasMany(ArchitectBuild)

// association for eager loading
ArchitectBuild.belongsTo(Architect)
ArchitectBuild.belongsTo(Build)

// clubs can have many employees, employees can work at multiple clubs
Club.belongsToMany(Employee, { through: 'clubEmployees' })
Employee.belongsToMany(Club, { through: 'clubEmployees' })

// courses can have many events, each event is contested on only one course
// this isn't strictly true in reality, but the final round is played
// on one course and that is the course that is considered to be the host
Course.hasMany(Event)
Event.belongsTo(Course)

// courses can have multiple yardage setups
Course.hasMany(TeeYardage)
TeeYardage.belongsTo(Course)

TeeYardage.hasMany(Hole)
Hole.belongsTo(TeeYardage)

Tee.hasMany(TeeYardage)
TeeYardage.belongsTo(Tee)

TeeGender.hasMany(TeeYardage)
TeeYardage.belongsTo(TeeGender)

Tournament.hasMany(Event)
Event.belongsTo(Tournament)

Tournament.hasMany(FormerName)
FormerName.belongsTo(Tournament)

Employee.belongsTo(EmployeeTitle)

Address.belongsTo(City)
Address.belongsTo(Subdivision)
Address.belongsTo(Country)
Subdivision.belongsTo(Country)
City.belongsTo(Subdivision)

Club.belongsTo(Location)
Location.belongsTo(City)
Location.belongsTo(Subdivision)
Location.belongsTo(Country)

Player.belongsTo(City, { as: 'hometown' })
Player.belongsTo(Nationality)

Nationality.belongsTo(Country)

Event.belongsTo(Player, { as: 'winner' })
// Player.hasMany(Event, { as: 'wins' })

RankingList.belongsTo(Publisher)
Publisher.hasMany(RankingList)

RankingList.belongsTo(RankingListName)
RankingListName.hasMany(RankingList)

Ranking.belongsTo(RankingList)
RankingList.hasMany(Ranking)

Ranking.belongsTo(Course)
Course.hasMany(Ranking)

module.exports = {
  User,
  Club,
  Employee,
  EmployeeTitle,
  Course,
  Tee,
  TeeGender,
  Hole,
  Scorecard,
  TeeYardage,
  Build,
  Address,
  City,
  Subdivision,
  Country,
  Location,
  Architect,
  ArchitectBuild,
  Tournament,
  Event,
  FormerName,
  Player,
  Nationality,
  Publisher,
  RankingList,
  RankingListName,
  Ranking,
}
