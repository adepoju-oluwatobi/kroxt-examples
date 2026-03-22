import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  // Kroxt supports adding any other fields here with no limits!
  schoolId: { type: String }, // New field for enterprise-level auth
  gender: { type: String },
  age: { type: Number },
  oauthProvider: { type: String }, // New: Support for OAuth
  oauthId: { type: String },       // New: Support for OAuth
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
