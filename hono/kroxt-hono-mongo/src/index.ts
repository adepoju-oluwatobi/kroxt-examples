import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
connectDB();

type Variables = {
  user: any;
};

const app = new Hono<{ Variables: Variables }>();

app.use("*", logger());
app.use("*", cors());

// All auth routes including /me
app.route("/api/auth", authRoutes);

const port = Number(process.env.PORT) || 3003;
console.log(`Hono (Mongoose) server running at http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
