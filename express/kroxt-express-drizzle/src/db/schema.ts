import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password").notNull(),
  name: text("name"),
  title: text("title"),
  dob: text("dob"),
  stateOfOrigin: text("state_of_origin"),
  phoneNumber: text("phone_number"),
  role: text("role").$type<"admin" | "user">().default("user"),
  schoolId: text("schoolId"),
  age: integer("age"),
  gender: text("gender"),
  oauthProvider: text("oauth_provider"),
  oauthId: text("oauth_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
});

export const rateLimits = sqliteTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull(),
  resetTime: integer("reset_time").notNull(),
});
