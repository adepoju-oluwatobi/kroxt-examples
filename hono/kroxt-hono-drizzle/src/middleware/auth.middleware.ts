import { Context, Next } from "hono";
import { auth } from "../config/auth.js";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const payload = await auth.verifyToken(token, "access");
  if (!payload) {
    return c.json({ error: "Invalid token" }, 401);
  }

  c.set("user", payload);
  await next();
};
