// backend/server.ts
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { sequelize } from './models';

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow the frontend at http://localhost:3000 and include credentials
app.use(
  cors({
    origin: 'http://localhost:3000', // explicitly allow this origin
    credentials: true,               // allow credentials (cookies, headers, etc.)
  })
);

// Configure session management
app.use(
  session({
    secret: 'your_secret_key', // change to an env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // set to true when using HTTPS
  })
);

/**
 * Starts the Apollo Server and the Express application.
 * @async
 * @function startServer
 * @returns {Promise<void>} A promise that resolves when the server has started.
 * @throws {Error} If there is an error starting the server or syncing the database.
 */
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }), // Pass request and response to context
  });

  await server.start();
  
  // Disable Apollo's internal CORS handling since we handle it globally
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  // Sync the Sequelize models with the database
  await sequelize.sync();

  // Start the Express server
  app.listen(4000, () =>
    console.log('Server running on http://localhost:4000/graphql')
  );
}

// Start the server
startServer();