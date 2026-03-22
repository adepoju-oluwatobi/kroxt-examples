import { createAuth } from "kroxt/core";
import { createDrizzleAdapter } from "kroxt/adapters/drizzle";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import dotenv from "dotenv";

dotenv.config();

const adapter = createDrizzleAdapter(db, users, eq);

export const auth = createAuth({
  adapter,
  secret: process.env.JWT_SECRET!,
  pepper: process.env.JWT_PEPPER,
  jwt: {
    payload: (user: any, type: string) => {
      if (type === "access") {
        return {
          role: user.role,
          schoolId: user.schoolId,
          name: user.name,
          age: user.age,
          gender: user.gender,
        };
      }
      return {};
    },
  },
});
