import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connection_string } from "@/utils/dbconnection";
import { Blog } from "@/utils/model/blog";

export async function POST(req, res) {
  const payload = await req.json();
  const { author, email, title, description } = payload;

  try {
    await mongoose.connect(connection_string);
    await Blog.create({
      author,
      email,
      title,
      description,
    });
    return NextResponse.json(
      { message: "Blog Published Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
