import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { connection_string } from "@/utils/dbconnection";
import { User } from "@/utils/model/user";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const payload = await req.json();
  const { email } = payload;

  try {
    await mongoose.connect(connection_string);

    const user = await User.findOne({ email });

    return NextResponse.json({
      message: "Profile retrieved successfully",
      user: { email, fullname: user.fullname },
    });
  } catch (error) {
    return NextResponse.json({ message: "No user found!" });
  }
}
