import { NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";
import Appointment from "@/models/Appointment";

export async function GET(request: NextRequest) {
  try {
    // Connect DB
    await connectDB();

    // Token check
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // MongoDB stats
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const approvedDoctors = await User.countDocuments({
      role: "doctor",
      isApproved: true,
    });
    const pendingDoctors = await User.countDocuments({
      role: "doctor",
      isApproved: false,
    });
    const totalAppointments = await Appointment.countDocuments();

    const stats = {
      totalUsers,
      totalDoctors,
      approvedDoctors,
      pendingDoctors,
      totalAppointments,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
