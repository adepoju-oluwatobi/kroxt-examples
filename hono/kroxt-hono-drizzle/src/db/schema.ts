import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  role: text("role").$type<"admin" | "user">().default("user"),
  schoolId: text("school_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});
