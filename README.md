# Kroxt Examples

This repository contains examples of how to use [Kroxt](https://github.com/adepoju-oluwatobi/kroxt), a framework-agnostic headless authentication engine, with various web frameworks and database adapters.

## Frameworks and Adapters

The examples are organized by framework and database adapter:

### [Express](./express)
- [**Drizzle (SQLite)**](./express/kroxt-express-drizzle): Using the Drizzle ORM with a local SQLite database.
- [**Mongoose (MongoDB)**](./express/kroxt-express-mongo): Using Mongoose for MongoDB.
- [**Prisma (SQLite)**](./express/kroxt-express-prisma): Using Prisma ORM with SQLite.

### [Fastify](./fastify)
- [**Drizzle (SQLite)**](./fastify/kroxt-fastify-drizzle): Using Drizzle ORM with Fastify.
- [**Mongoose (MongoDB)**](./fastify/kroxt-fastify-mongo): Using Mongoose for MongoDB with Fastify.

### [Hono](./hono)
- [**Drizzle (SQLite)**](./hono/kroxt-hono-drizzle): Using Drizzle ORM with Hono.
- [**Mongoose (MongoDB)**](./hono/kroxt-hono-mongo): Using Mongoose for MongoDB with Hono.
- [**Prisma (SQLite)**](./hono/kroxt-hono-prisma): Using Prisma ORM with SQLite in a Hono application.

### [Security Samples](./security-samples)
- [**CSRF Protection**](./security-samples/csrf-example): Implementing the Double-Submit Cookie pattern with Kroxt security utilities.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or another package manager

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adepoju-oluwatobi/kroxt-examples.git
   cd kroxt-examples
   ```

2. **Navigate to an example**:
   ```bash
   cd express/kroxt-express-prisma
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up your environment variables**:
   Each example includes a `.env.example` file. Create a `.env` file based on it:
   ```bash
   cp .env.example .env
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

## Key Features Demonstrated

- **Session Management**: Secure session handling using JWTs and refresh tokens.
- **Database Adapters**: Integration with Prisma, Drizzle, and Mongoose.
- **Authentication Routes**: Login, register, logout, and token refresh flows.
- **Middleware Integration**: Protecting routes and retrieving the current user from the session.
- **CSRF Protection**: Stateless security using double-submit cookies and timing-safe comparisons.

## License

MIT
