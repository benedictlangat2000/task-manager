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

app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow the frontend at http://localhost:3000 and include credentials
app.use(
  cors({
    origin: 'http://localhost:3000', // explicitly allow this origin
    credentials: true,               // allow credentials (cookies, headers, etc.)
  })
);

app.use(
  session({
    secret: 'your_secret_key', // change to an env variable in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // set to true when using HTTPS
  })
);

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res }),
  });
  await server.start();
  // Disable Apollo's internal CORS handling since we handle it globally
  server.applyMiddleware({ app, path: '/graphql', cors: false });

  // Sync the Sequelize models with the database
  await sequelize.sync();
  app.listen(4000, () =>
    console.log('Server running on http://localhost:4000/graphql')
  );
}

startServer();
