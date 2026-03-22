import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = new Hono();

authRoutes.post("/register", AuthController.register);
authRoutes.post("/login", AuthController.login);
authRoutes.post("/refresh", AuthController.refresh);
authRoutes.get("/me", authMiddleware, AuthController.me);

export default authRoutes;
