import { createRequire } from "module";
import { drizzle } from "drizzle-orm/better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const require = createRequire(import.meta.url);
const Database = require("better-sqlite3");

const sqlite = new Database(process.env.DATABASE_URL || "sqlite.db");
export const db = drizzle(sqlite);
