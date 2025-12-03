import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Availability from "@/models/Availability";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "doctor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // Fetch all availabilities for this doctor
    const availabilities = await Availability.find({ doctorId: decoded.userId }).lean();

    return NextResponse.json({ availabilities });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== "doctor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { date, startTime, endTime } = await request.json();

    // Find availability for this doctor and date
    let availability = await Availability.findOne({
      doctorId: decoded.userId,
      date: new Date(date).toDateString(),
    });

    if (availability) {
      // Add new time slot
      availability.timeSlots.push({ startTime, endTime, isBooked: false });
      await availability.save();
    } else {
      // Create new availability
      availability = await Availability.create({
        doctorId: decoded.userId,
        date: new Date(date).toDateString(),
        timeSlots: [{ startTime, endTime, isBooked: false }],
      });
    }

    return NextResponse.json({ message: "Time slot added successfully" });
  } catch (error) {
    console.error("Error adding availability:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
