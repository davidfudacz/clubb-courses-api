const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type User {
    id: Int!
    givenName: String!
    surname: String!
    fullName: String!
    email: String!
    isAdmin: Boolean!
  }

  type Club {
    name: String!
    informal: String!
    established: Int!
    logoUrl: String
    websiteUrl: String
  }

  type Query {
    message: String
  }
`)

const rootValue = {
  message: () => 'Hello'
}

module.exports = expressGraphql({
  schema,
  rootValue,
  graphiql: true,
})
