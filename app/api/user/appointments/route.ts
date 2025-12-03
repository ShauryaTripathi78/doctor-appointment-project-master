import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Appointment from "@/models/Appointment";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Fetch all appointments for this user
    const appointments = await Appointment.find({ userId: decoded.userId }).lean();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
