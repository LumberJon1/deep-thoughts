const {gql} = require("apollo-server-express");

// Create typeDefs
const typeDefs = gql`
    type Query {
        helloWorld: String
    }`;

module.exports = typeDefs;