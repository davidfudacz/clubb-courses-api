const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
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
