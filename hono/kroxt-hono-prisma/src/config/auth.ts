import { createAuth } from "kroxt/core";
import { createPrismaAdapter } from "kroxt/adapters/prisma";
import { prisma } from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();

const adapter = createPrismaAdapter(prisma.user);

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
        };
      }
      return {};
    },
  },
});
