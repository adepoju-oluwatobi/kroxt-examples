import { createAuth } from "kroxt";
import { createPrismaAdapter } from "kroxt/adapters/prisma";
import { prisma } from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();

export const authAdapter = createPrismaAdapter(prisma.user);

export const auth = createAuth({
  adapter: authAdapter,
  secret: process.env.JWT_SECRET || "fallback-secret-for-dev",
  pepper: process.env.JWT_PEPPER || "",
  session: {
    expires: "15m",
    refreshExpires: "7d"
  },
  jwt: {
    payload: (user, type) => {
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
  }
});
