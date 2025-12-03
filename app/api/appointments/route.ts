import { NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import { verifyToken } from "@/lib/auth";
import Availability from "@/models/Availability";
import Appointment from "@/models/Appointment";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check token
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { doctorId, date, timeSlot } = await request.json();

    // Fetch doctor's availability for that date
    const availability = await Availability.findOne({
      doctorId,
      date: new Date(date).toDateString(),
    });

    if (!availability) {
      return NextResponse.json({ message: "No availability found" }, { status: 400 });
    }

    // Check if slot exists & is not booked
    const slot = availability.timeSlots.find(
      (s: any) =>
        s.startTime === timeSlot.startTime &&
        s.endTime === timeSlot.endTime &&
        !s.isBooked
    );

    if (!slot) {
      return NextResponse.json({ message: "Time slot not available" }, { status: 400 });
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId: decoded.userId,
      doctorId,
      date: new Date(date),
      timeSlot,
      status: "confirmed",
    });

    // Mark that slot as booked
    slot.isBooked = true;
    await availability.save();

    return NextResponse.json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
