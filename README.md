## Task Management App

A full-stack Task Management App built with Express.js, Sequelize, GraphQL, and Next.js. This project demonstrates a modern approach to building a scalable and secure application, complete with unit/integration tests, authentication, and responsive design.

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Installation
- Configuration
- Running the Application
- Testing
- Deployment
- Documentation
- Contributing
- License

## Overview

The Task Management App allows users to sign up, log in, and manage tasks. Users can create, update, and delete tasks with statuses such as pending, in-progress, and completed. The backend is built using Express.js, Sequelize (with PostgreSQL/MySQL), and GraphQL via Apollo Server. The frontend leverages Next.js with Apollo Client for seamless GraphQL interactions and uses Tailwind CSS for responsive design.

## Features

**User Authentication:**

- Register a new account.
- Login with JWT-based authentication.
- Automatic token expiry handling and logout.

**Task Management:**

- Create, update, and delete tasks.
- Optimistic UI updates for seamless user experience.
- Pagination for task lists.

**Responsive Design:**

- Mobile-first approach with Tailwind CSS.
- Clean, intuitive user interface.

**Testing:**

- Unit and integration tests for backend (using Jest & Supertest).
- Frontend tests using Jest and React Testing Library.

**Deployment Ready:**

- Environment variable configuration.
- Deployment instructions for both backend and frontend.

## Tech Stack

**Backend:**

- Node.js, Express.js, TypeScript
- Sequelize ORM with PostgreSQL/MySQL
- GraphQL with Apollo Server
- JWT Authentication, Sessions & Cookies

**Frontend:**

- Next.js (with App Router) & TypeScript
- Apollo Client for GraphQL
- Tailwind CSS for styling
- React Hook Form for client-side validation

**Testing:**

- Jest, Supertest, React Testing Library

## Project Structure

```bash
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts           # Database configuration using Sequelize
│   │   ├── models/
│   │   │   ├── User.ts               # User model definition
│   │   │   └── Task.ts               # Task model definition
│   │   ├── graphql/
│   │   │   ├── schema.ts             # GraphQL type definitions
│   │   │   └── resolvers.ts          # GraphQL resolvers for queries & mutations
│   │   ├── index.ts                # Express server & Apollo Server setup
│   │   └── tests/                    # Unit and integration tests
│   ├── .env                        # Environment variables for backend
│   └── package.json                # Backend dependencies and scripts
├── frontend/
│   ├── pages/
│   │   ├── _app.tsx                # Global App setup with Apollo Provider & token expiry check
│   │   ├── index.tsx               # Login page
│   │   ├── register.tsx            # Registration page
│   │   └── dashboard.tsx           # Task dashboard with pagination and logout
│   ├── components/
│   │   ├── TaskForm.tsx            # Form for creating new tasks (with optimistic UI)
│   │   └── TaskList.tsx            # List of tasks with update and delete functionality
│   ├── apollo/
│   │   └── client.ts               # Apollo Client setup with authentication link
│   ├── styles/
│   │   └── globals.css             # Global styles using Tailwind CSS
│   ├── package.json                # Frontend dependencies and scripts
│   └── README.md                   # Frontend project documentation
└── README.md                       # Main project documentation


Installation
Prerequisites
Node.js (v14 or higher)

npm (v6 or higher) or yarn

MySQL/PostgreSQL database

Backend Setup
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Install dependencies:


```bash
npm install
```
Create a .env file in the backend directory (see Configuration below).

Run the development server:

```bash

npm run dev
```
## Frontend Setup
Navigate to the frontend folder:

```bash

cd frontend
```
Install dependencies:
```bash

npm install
```
## Run the development server:


```bash
npm run dev
```
# Configuration
## Backend (.env)
Create a .env file in the backend directory with the following variables:

env

DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
PORT=4000
Replace the placeholder values with your actual database credentials and secret key.

Running the Application
Backend
Start the backend server with:

```bash
npm run dev
```
The GraphQL endpoint will be available at:
http://localhost:4000/graphql

Frontend
Start the Next.js development server with:

```bash
npm run dev
```
The application will run at:
http://localhost:3000

Testing
Backend Tests
Unit and integration tests are written using Jest and Supertest.

To run the tests:

```bash
npm test
```
Frontend Tests
Frontend tests are built using Jest and React Testing Library.

To run the tests:

```bash
npm test
```
## Deployment
# Backend Deployment
Providers: Deploy the backend on platforms like Heroku, Railway, or Render.

Environment Variables: Ensure all required environment variables are set on the hosting platform.

Build Command: Use npm run build (if applicable) and npm start for production.

# Frontend Deployment
Vercel: Deploy the Next.js frontend to Vercel.

Configuration: Set environment variables for the API endpoint if needed.

Build Command: Vercel handles the build automatically based on your package.json settings.

Documentation
JSDoc Comments: The backend code is documented using JSDoc. Each function and API endpoint includes inline documentation.

GraphQL Schema Documentation: The schema.ts file provides a clear definition of the API endpoints, queries, and mutations.

README Files: Both the backend and frontend contain their own README.md files with setup and usage instructions.

## Contributing
Fork the repository.

Create a new branch: git checkout -b feature/your-feature-name.

Commit your changes: git commit -am 'Add some feature'.

Push to the branch: git push origin feature/your-feature-name.

Create a new Pull Request.

Feel free to open issues if you have suggestions or find any bugs.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
This project was inspired by modern web development practices and full-stack development tutorials.

Thanks to the open-source community for their invaluable resources and libraries.