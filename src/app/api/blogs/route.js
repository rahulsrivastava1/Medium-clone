import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connection_string } from "@/utils/dbconnection";
import { Blog } from "@/utils/model/blog";

export async function GET(req, res) {
  try {
    await mongoose.connect(connection_string);
    const blogs = await Blog.find();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
