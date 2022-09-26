const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {authMiddleware} = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');


const PORT = process.env.PORT || 3008;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}


app.use(routes);

// create new instance of apollo server
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our server with express middleware
  server.applyMiddleware({ app });
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  // to test our GQL api
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});


startApolloServer(typeDefs, resolvers);
