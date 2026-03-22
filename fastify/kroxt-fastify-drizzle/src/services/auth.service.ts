import { auth } from "../config/auth.js";

export class AuthService {
  static async signup(data: any, password: string) {
    return await auth.signup(data, password);
  }

  static async login(email: string, password: string) {
    return await auth.loginWithPassword(email, password);
  }

  static async refresh(refreshToken: string) {
    return await auth.refresh(refreshToken);
  }
}
