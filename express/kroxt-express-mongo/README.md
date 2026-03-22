# Kroxt Express — Mongoose Example

A clean, production-ready example of integrating `kroxt` with **MongoDB via Mongoose** in a Node.js/Express application using a Service-Controller-Route architecture.

## Features
- **Mongoose Adapter**: Connects directly to MongoDB
- **Clean Structure**: Separation of concerns between routing, controllers, and services
- **Full Auth Flow**: Register, Login, Refresh Token rotation
- **Extensible Users**: Add any extra fields to your Mongoose schema effortlessly
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
   Make sure `MONGODB_URI` points to your running MongoDB instance.

3. **Run in Development**:
   ```bash
   npm run dev
   ```

## Folder Structure
```text
src/
├── config/       # Kroxt & Mongoose adapter initialization
├── controllers/  # Request handling logic
├── models/       # Mongoose schemas
├── routes/       # API route definitions
├── services/     # Business logic (Kroxt wrappers)
└── index.ts      # App entry point
```
