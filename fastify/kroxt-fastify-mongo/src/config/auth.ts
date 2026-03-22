import { createAuth } from "kroxt/core";
import { createMongoAdapter } from "kroxt/adapters/mongoose";
import { User } from "../db/models/User.js";
import dotenv from "dotenv";

dotenv.config();

const adapter = createMongoAdapter(User);

export const auth = createAuth({
  adapter,
  secret: process.env.JWT_SECRET!,
  pepper: process.env.JWT_PEPPER,
  jwt: {
    payload: (user: any, type: string) => {
      if (type === "access") {
        return { role: user.role, schoolId: user.schoolId };
      }
      return {};
    },
  },
});
