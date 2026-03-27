import { createAuth } from "kroxt";
import { createDrizzleAdapter } from "kroxt/adapters/drizzle";
import { db, users, rateLimits } from "../db/index.js";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

export const authAdapter = createDrizzleAdapter(db, users, eq, rateLimits);

export const auth = createAuth({
  adapter: authAdapter,
  secret: process.env.JWT_SECRET || "fallback-secret-for-dev",
  pepper: process.env.JWT_PEPPER || "",
  session: {
    expires: "15m",
    refreshExpires: "7d",
    enforceStrictRevocation: true
  },
  jwt: {
    payload: (user: any, type: "access" | "refresh") => {
      if (type === "access") {
        return {
          schoolId: user.schoolId,
          role: user.role,
          age: user.age,
          gender: user.gender
        };
      }
      return {};
    }
  },
  rateLimit: {
    max: 5,
    windowMs: 60000
  },
  ipBlocking: {
    maxStrikes: 3,
    blockDurationMs: 60000
  }
});
