import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

export const User =
  mongoose.models.users || new mongoose.model("users", userModel);
