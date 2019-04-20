const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
    email: String!
    active: Boolean
    articles: [Article]
    requirePasswordReset: Boolean
    token: String
  }
`;

module.exports = { typeDefs };
