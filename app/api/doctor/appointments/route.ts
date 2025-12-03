import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Appointment from "@/models/Appointment";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Check token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "doctor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Fetch appointments for this doctor
    const appointments = await Appointment.find({ doctorId: decoded.userId }).lean();

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
