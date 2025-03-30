// backend/schema.ts
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    userId: ID!
  }

  type Query {
    tasks: [Task!]
    task(id: ID!): Task
    me: User
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: Boolean
    createTask(title: String!, description: String!, status: String!): Task
    updateTask(id: ID!, title: String, description: String, status: String): Task
    deleteTask(id: ID!): Boolean
  }
`;
