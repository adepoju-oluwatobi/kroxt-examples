import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: String,
  age: Number,
  gender: String,
  role: { type: String, default: "user" },
  schoolId: String,
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", userSchema);
