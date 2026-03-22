import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Health Check
app.get("/health", (req: Request, res: Response) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`[Prisma/SQLite] Server running at http://localhost:${PORT}`);
});
