# Kroxt Express — Prisma Example

A clean, production-ready example of integrating `kroxt` with **SQLite via Prisma ORM** in a Node.js/Express application using a Service-Controller-Route architecture.

## Features
- **Prisma Adapter**: Uses Prisma ORM with a SQLite database for a type-safe, auto-migrated backend
- **Clean Structure**: Separation of concerns between routing, controllers, and services
- **Full Auth Flow**: Register, Login, Refresh Token rotation
- **Extensible Users**: Add any extra fields to your Prisma schema effortlessly
- **Secure by Default**: Cookie-based refresh tokens and timing-attack protection

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your secrets.
   ```bash
   cp .env.example .env
   ```

3. **Generate Prisma Client & Migrate**:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Run in Development**:
   ```bash
   npm run dev
   ```

## Folder Structure
```text
src/
├── config/       # Kroxt & Prisma adapter initialization
├── controllers/  # Request handling logic
├── db/           # Prisma client singleton
├── routes/       # API route definitions
├── services/     # Business logic (Kroxt wrappers)
└── index.ts      # App entry point
prisma/
└── schema.prisma # Database schema
```
