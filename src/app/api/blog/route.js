import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connection_string } from "@/utils/dbconnection";
import { Blog } from "@/utils/model/blog";

export async function POST(req, res) {
  const payload = await req.json();
  const { _id } = payload;

  try {
    await mongoose.connect(connection_string);
    const blog = await Blog.findOne({ _id });
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
