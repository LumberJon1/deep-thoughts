const {gql} = require("apollo-server-express");

// Create typeDefs
const typeDefs = gql`

    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Query {
        users: [User]
        user(username: String!): User
        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }
`

// user(username: String!): User
// is a query that can accept an optional arg username, and will then return that particular user.
// It can be left blank as long as the exclamation point is missing, otherwise this is required.

module.exports = typeDefs;