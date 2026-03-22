import { Context } from "hono";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  static async register(c: Context) {
    const body = await c.req.json();
    const { email, password, ...extra } = body;
    try {
      const result = await AuthService.signup({ email, ...extra }, password);
      return c.json({ message: "User registered successfully", ...result }, 201);
    } catch (err: any) {
      return c.json({ error: err.message }, 400);
    }
  }

  static async login(c: Context) {
    const body = await c.req.json();
    const { email, password } = body;
    try {
      const result = await AuthService.login(email, password);
      return c.json(result);
    } catch (err: any) {
      return c.json({ error: err.message }, 401);
    }
  }

  static async refresh(c: Context) {
    const { refreshToken } = await c.req.json();
    try {
      const result = await AuthService.refresh(refreshToken);
      return c.json(result);
    } catch (err: any) {
      return c.json({ error: err.message }, 401);
    }
  }

  static async me(c: Context) {
    const user = c.get("user");
    return c.json({ user });
  }
}
