import { auth } from "../config/auth.js";

export class AuthService {
  async signup(userData: any, password?: string) {
    return await auth.signup(userData, password);
  }

  async login(email: string, password: string, clientIp?: string) {
    return await auth.loginWithPassword(email, password, clientIp);
  }

  async refresh(refreshToken: string) {
    return await auth.refresh(refreshToken);
  }

  async verifyToken(token: string, type: "access" | "refresh" = "access") {
    return await auth.verifyToken(token, type);
  }
}

export const authService = new AuthService();
