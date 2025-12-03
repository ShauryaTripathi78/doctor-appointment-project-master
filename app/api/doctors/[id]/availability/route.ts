import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@//lib/mongodb";
import Availability from "@/models/Availability";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const doctorId = params.id;

    // Fetch all availabilities for this doctor
    const availabilities = await Availability.find({ doctorId }).lean();

    // Filter future dates only
    const futureAvailabilities = availabilities.filter((availability: any) => {
      const availDate = new Date(availability.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return availDate >= today;
    });

    return NextResponse.json({ availabilities: futureAvailabilities });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
