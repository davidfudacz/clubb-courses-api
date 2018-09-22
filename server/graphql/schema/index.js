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
    informal: String!
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
    birthYear: String
    deathYear: String
    imgUrl: String
  }
  
  type Build {
    id: Int!
    builtType: String!
    year: String!
    numOfHoles: String!
    architects: [Architect!]!
  }

  type Query {
    message: String
  }
`
