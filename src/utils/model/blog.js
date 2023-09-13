import mongoose from "mongoose";

const blogModel = new mongoose.Schema({
  author: String,
  email: String,
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Blog =
  mongoose.models.blogs || new mongoose.model("blogs", blogModel);
