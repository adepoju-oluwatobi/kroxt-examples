import Fastify from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./routes/auth.routes.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

// Connect MongoDB
await connectDB();

// Plugins
await fastify.register(cors, { origin: "*" });

// Routes — all auth routes mounted under /api/auth
await fastify.register(authRoutes, { prefix: "/api/auth" });

// Start
const port = Number(process.env.PORT) || 3004;
try {
  await fastify.listen({ port, host: "0.0.0.0" });
  console.log(`Fastify (Mongoose) server running at http://localhost:${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
