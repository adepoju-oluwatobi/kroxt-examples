import { FastifyRequest, FastifyReply } from "fastify";
import { auth } from "../config/auth.js";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return reply.code(401).send({ error: "Unauthorized" });

  const payload = await auth.verifyToken(token, "access");
  if (!payload) return reply.code(401).send({ error: "Invalid token" });

  (req as any).user = payload;
}
