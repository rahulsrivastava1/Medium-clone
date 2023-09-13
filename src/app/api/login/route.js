import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connection_string } from "@/utils/dbconnection";
import { User } from "@/utils/model/user";

export async function POST(req, res) {
  const payload = await req.json();
  const { email, password } = payload;

  const secret = "blog";

  try {
    await mongoose.connect(connection_string);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({
        message: "User doesn't found with this email id",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Invalid Credentials!" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret
    );
    return NextResponse.json(
      {
        message: "Login Successfull!",
        token: token,
        email: existingUser.email,
        fullname: existingUser.fullname,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
