import { createAuth } from "kroxt";
import { createMongoAdapter, createRateLimitModel } from "kroxt/adapters/mongoose";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const authAdapter = createMongoAdapter(User, createRateLimitModel(mongoose));

export const auth = createAuth({
  adapter: authAdapter,
  secret: process.env.JWT_SECRET || "fallback-secret-for-dev",
  pepper: process.env.JWT_PEPPER || "",
  session: {
    expires: "15m",
    refreshExpires: "7d",
    enforceStrictRevocation: true
  },
  passwordPolicy: {
    minLength: 6,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialCharacter: true
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
