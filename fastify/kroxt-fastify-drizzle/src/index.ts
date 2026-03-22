import Fastify from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: "*" });
await fastify.register(authRoutes, { prefix: "/api/auth" });

const port = Number(process.env.PORT) || 3005;
try {
  await fastify.listen({ port, host: "0.0.0.0" });
  console.log(`Fastify (Drizzle) server running at http://localhost:${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
