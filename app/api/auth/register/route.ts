import { type NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import connectDB from "@//lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { name, email, password, phone, role, specialization, experience } =
      await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Build user data
    const userData: any = {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    };

    if (role === "doctor") {
      userData.specialization = specialization;
      userData.experience = Number.parseInt(experience);
      userData.isApproved = false;
    }

    // Create user in MongoDB
    const user = await User.create(userData);

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
