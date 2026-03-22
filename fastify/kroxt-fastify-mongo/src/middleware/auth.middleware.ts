import { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "../config/auth.js";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  const payload = await auth.verifyToken(token, "access");
  if (!payload) {
    return reply.code(401).send({ error: "Invalid token" });
  }

  // Attach user payload to request for downstream handlers
  (req as any).user = payload;
}
