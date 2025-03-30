// frontend/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include' // send cookies with each request
});

export default client;
