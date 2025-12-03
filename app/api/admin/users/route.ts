import { NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    // Connect MongoDB
    await connectDB();

    // Check token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Fetch users with role "user" or "admin"
    const users = await User.find({
      role: { $in: ["user", "admin"] },
    }).lean();

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
