import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/user";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongoDB();
    const userData = await req.json();

    const { email, name, image } = userData;

    await User.findOneAndUpdate(
      { email },
      { name, image, email },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ message: "User created/updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error during user creation/update:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}