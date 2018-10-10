const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    id: Int!
    givenName: String!
    surname: String!
    fullName: String!
    email: String!
    isAdmin: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Location {
    id: Int!
    lat: String
    lng: String
    googlePlacesId: Int
    cityId: Int
    city: City
    subdivisionId: Int
    subdivision: Subdivision
    countryId: Int
    country: Country
    createdAt: String!
    updatedAt: String!
  }

  type City {
    id: Int!
    name: String!
    subdivisionId: Int!
    subdivision: Subdivision!
    createdAt: String!
    updatedAt: String!
  }

  type Subdivision {
    id: Int!
    name: String!
    abbreviation: String!
    countryId: Int!
    country: Country!
    cities: [City!]!
    createdAt: String!
    updatedAt: String!
  }

  type Country {
    id: Int!
    name: String!
    informal: String
    abbreviation: String!
    demonym: String!
    demonymPlural: String!
    flagImgUrl: String
    subdivisions: [Subdivision!]!
    createdAt: String!
    updatedAt: String!
  }

  type Club {
    id: Int!
    name: String!
    informal: String
    established: String!
    logoUrl: String
    websiteUrl: String
    totalNumOfHoles: Int!
    membershipType: String!
    locationId: Int!
    location: Location
    parsedLocation: String
    parsedLocationAbbreviated: String
    courses: [Course!]!
    createdAt: String!
    updatedAt: String!
  }

  type Course {
    id: Int!
    name: String
    informal: String
    numOfHoles: Int!
    builds: [Build!]!
    clubId: Int!
    club: Club!
    originalBuild: Build
    parsedName: String!
    parsedNameInformal: String!
    parsedLocation: String
    parsedLocationAbbreviated: String
    createdAt: String!
    updatedAt: String!
  }

  type Architect {
    id: Int!
    givenName: String!
    surname: String!
    fullname: String!
    birthYear: String
    deathYear: String
    imgUrl: String
    builds: [Build!]!
    createdAt: String!
    updatedAt: String!
  }
  
  type Build {
    id: Int!
    buildType: String!
    year: String!
    numOfHoles: String!
    architects: [Architect!]
    courseId: Int!
    course: Course!
    createdAt: String!
    updatedAt: String!
  }

  type Ranking {
    id: Int!
    rank: String!
    rankingListId: Int!
    courseId: Int!
    course: Course!
    createdAt: String!
    updatedAt: String!
  }

  type RankingList {
    id: Int!
    year: String!
    publisherId: Int!
    publisher: Publisher!
    rankingListNameId: Int!
    rankingListName: RankingListName!
    rankings: [Ranking!]!
    createdAt: String!
    updatedAt: String!
  }

  type RankingListName {
    id: Int!
    name: String!
    informal: String
    createdAt: String!
    updatedAt: String!
  }

  type Publisher {
    id: Int!
    name: String!
    informal: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    clubs: [Club!]
    club(id: ID!): Club
    courses: [Course!]
    course(id: ID!): Course
    architects: [Architect!]
    architect(id: ID!): Architect
    publishers: [Publisher!]
    publisher(id: ID!): Publisher
    rankingLists: [RankingList!]
    rankingList(id: ID!): RankingList
    location(id: ID!): Location
    city(id: ID!): City
    subdivisions: [Subdivision!]
    countries: [Country!]
  }
`
