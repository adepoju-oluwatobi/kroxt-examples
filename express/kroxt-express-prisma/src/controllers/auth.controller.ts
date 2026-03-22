import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { authAdapter } from "../config/auth.js";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, ...extraFields } = req.body;
      const result = await authService.signup({ name, email, ...extraFields }, password);

      res.cookie("refresh_token", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

      res.status(201).json({
        message: "User registered successfully",
        user: result.user,
        accessToken: result.accessToken
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);

      res.cookie("refresh_token", result.refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

      res.json({
        message: "Login successful",
        user: result.user,
        accessToken: result.accessToken
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refresh_token || req.body.refreshToken;
      if (!refreshToken) throw new Error("Refresh token missing");

      const { accessToken } = await authService.refresh(refreshToken);
      res.json({ accessToken });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async getMe(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new Error("Unauthorized");

      const payload = await authService.verifyToken(token, "access");
      if (!payload) throw new Error("Invalid or expired access token");

      const user = await authAdapter.findUserById(payload.sub as string);
      if (!user) throw new Error("User not found");

      res.json({ user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export const authController = new AuthController();
