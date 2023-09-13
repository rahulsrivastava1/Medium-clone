import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connection_string } from "@/utils/dbconnection";
import { User } from "@/utils/model/user";

export async function POST(req, res) {
  const payload = await req.json();
  const { fullname, email, password } = payload;

  try {
    await mongoose.connect(connection_string);
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return NextResponse.json({
        message: "User already exists with same email id",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "Account Created Successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
