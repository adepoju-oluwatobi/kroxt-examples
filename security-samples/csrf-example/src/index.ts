import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { generateCsrfToken, verifyCsrf } from "kroxt/security";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Mock database check
const users = [{ id: "1", email: "admin@kroxt.dev", password: "password123" }];

/**
 * 1. Login Route: Generates both access tokens and CSRF tokens
 */
app.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Generate CSRF token for the session
    const csrfToken = generateCsrfToken();

    // Set CSRF token as a HttpOnly, Secure cookie
    res.cookie("csrf_token", csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.json({
        message: "Logged in successfully",
        csrfToken, // Send to client for header injection
    });
});

/**
 * 2. CSRF Middleware: Verifies the token using Kroxt's timing-safe utility
 */
const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
    const tokenFromHeader = req.headers["x-csrf-token"] as string;
    const tokenFromCookie = req.cookies["csrf_token"];

    if (!verifyCsrf(tokenFromHeader, tokenFromCookie)) {
        return res.status(403).json({ error: "Forbidden: Invalid CSRF token" });
    }
    next();
};

/**
 * 3. Protected Route: Requires a valid CSRF token
 */
app.post("/update-profile", csrfProtection, (req: Request, res: Response) => {
    res.json({ message: "Profile updated securely!" });
});

const PORT = 3009;
app.listen(PORT, () => {
    console.log(`CSRF Security Demo running at http://localhost:${PORT}`);
    console.log(`1. POST /login to get your tokens`);
    console.log(`2. POST /update-profile with 'x-csrf-token' header to verify protection`);
});
