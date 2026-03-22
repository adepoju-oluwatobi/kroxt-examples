import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", AuthController.register);
  fastify.post("/login", AuthController.login);
  fastify.post("/refresh", AuthController.refresh);

  // Protected /me — preHandler runs authMiddleware before the handler
  fastify.get("/me", {
    preHandler: authMiddleware,
    handler: AuthController.me,
  });
}
