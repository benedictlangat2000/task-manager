import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { sequelize } from './models';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow the frontend and include credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // explicitly allow this origin
    credentials: true,               // allow credentials (cookies, headers, etc.)
  })
);

// Configure session management
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key', // use env variable for production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }  // set to true when using HTTPS
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
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/graphql`)
  );
}

// Start the server
startServer();