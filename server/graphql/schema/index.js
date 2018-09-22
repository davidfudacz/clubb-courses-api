const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    id: Int!
    givenName: String!
    surname: String!
    fullName: String!
    email: String!
    isAdmin: Boolean!
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
    courses: [Course!]!
  }

  type Course {
    id: Int!
    name: String
    informal: String
    numOfHoles: Int!
    builds: [Build!]!
  }

  type Architect {
    id: Int!
    givenName: String!
    surname: String!
    fullname: String!
    birthYear: String
    deathYear: String
    imgUrl: String
    builds: [Build!]
  }
  
  type Build {
    id: Int!
    buildType: String!
    year: String!
    numOfHoles: String!
    architects: [Architect!]
  }

  type Query {
    clubs: [Club!]
    club(id: ID!): Club
    courses: [Course!]
    course(id: ID!): Course
    architects: [Architect!]
    architect(id: ID!): Architect
  }
`
