import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema.js";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema });

// Re-export schema for convenience
export * from "./schema.js";
