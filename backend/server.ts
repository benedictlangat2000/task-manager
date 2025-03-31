import express, { Request, Response, Application } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { sequelize } from './models';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create an instance of the Express application
const app: Application = express();

// Middleware to parse JSON requests and cookies
app.use(express.json());
app.use(cookieParser());

/**
 * Configures CORS to allow the frontend to access the backend API.
 * The allowed origin is taken from the environment variable FRONTEND_URL or defaults to http://localhost:3000.
 */
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

/**
 * Configures session management.
 * Uses a session secret from environment variables and sets cookies to secure in production.
 */
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key', // Replace with a secure value in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' },
  })
);

/**
 * Starts the Apollo Server and the Express application.
 * @async
 * @function startServer
 * @returns {Promise<void>} A promise that resolves when the server has started.
 * @throws {Error} If there is an error starting the server or syncing the database.
 */
async function startServer(): Promise<void> {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }: { req: Request; res: Response }): { req: Request; res: Response } => ({ req, res }),
  });

  await server.start();

  // Disable Apollo's internal CORS handling since we handle it globally
  server.applyMiddleware({ app: app as any, path: '/graphql', cors: false });


  // Sync the Sequelize models with the database
  await sequelize.sync();

  // Start the Express server on the specified port
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}/graphql`)
  );
}

// Start the server and handle any startup errors
startServer().catch((error) => console.error('Server startup error:', error));
