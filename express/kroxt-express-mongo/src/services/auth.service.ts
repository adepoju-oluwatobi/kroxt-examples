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

  async changePassword(token: string, newPassword: string) {
    const payload = await auth.verifyToken(token, "access");
    if (!payload || !payload.sub) throw new Error("Unauthorized");

    await auth.changePassword(payload.sub, newPassword);
  }
}

export const authService = new AuthService();
