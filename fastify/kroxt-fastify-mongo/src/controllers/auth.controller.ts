import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async register(req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as any;
    const { email, password, ...extra } = body;
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

  static async changePassword(req: FastifyRequest, reply: FastifyReply) {
    const { newPassword } = req.body as any;
    const userPayload = (req as any).user;
    try {
      if (!newPassword) throw new Error("newPassword is required");
      
      const argon2 = await import("argon2");
      const { User } = await import("../db/models/User.js");
      
      // Hash the new password (assuming no pepper in this example, or add it if needed)
      const pepper = process.env.JWT_PEPPER || "";
      const passwordWithPepper = pepper ? `${newPassword}${pepper}` : newPassword;
      const newHash = await argon2.hash(passwordWithPepper);
      
      // Update the user's passwordHash in the database
      // The session revocation feature in Kroxt will now automatically 
      // invalidate any existing refresh tokens because the hash fragment will change.
      await User.findByIdAndUpdate(userPayload.sub, { passwordHash: newHash });
      
      return reply.send({ message: "Password updated successfully. Existing refresh tokens have been revoked." });
    } catch (err: any) {
      return reply.code(400).send({ error: err.message });
    }
  }

  static async me(req: FastifyRequest, reply: FastifyReply) {
    // user is set by the preHandler hook in the route
    const user = (req as any).user;
    return reply.send({ user });
  }
}
