const express = require('express');
const db = require('./config/connection');

// Import Apollo Server
const {ApolloServer} = require("apollo-server-express");

// Import typeDefs and resolvers
const {typeDefs, resolvers} = require("./schemas");


const PORT = process.env.PORT || 3001;

// Create Apollo Express Server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create instance of Apollo server with GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({app});
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

startApolloServer(typeDefs, resolvers);
