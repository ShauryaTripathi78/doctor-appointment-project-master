import { NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import User from "@//models/User";

export async function GET() {
  try {
    await connectDB();

    // Fetch all approved doctors
    const doctors = await User.find({ role: "doctor", isApproved: true }).lean();

    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
