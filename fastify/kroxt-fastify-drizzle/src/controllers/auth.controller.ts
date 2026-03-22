import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async register(req: FastifyRequest, reply: FastifyReply) {
    const { email, password, ...extra } = req.body as any;
    try {
      const result = await AuthService.signup({ email, ...extra }, password);
      return reply.code(201).send({ message: "User registered successfully", ...result });
    } catch (err: any) {
      return reply.code(400).send({ error: err.message });
    }
  }

  static async login(req: FastifyRequest, reply: FastifyReply) {
    const { email, password } = req.body as any;
    try {
      const result = await AuthService.login(email, password);
      return reply.send(result);
    } catch (err: any) {
      return reply.code(401).send({ error: err.message });
    }
  }

  static async refresh(req: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = req.body as any;
    try {
      const result = await AuthService.refresh(refreshToken);
      return reply.send(result);
    } catch (err: any) {
      return reply.code(401).send({ error: err.message });
    }
  }

  static async me(req: FastifyRequest, reply: FastifyReply) {
    return reply.send({ user: (req as any).user });
  }
}
