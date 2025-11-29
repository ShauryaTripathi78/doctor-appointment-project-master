import { type NextRequest, NextResponse } from "next/server"
import { getAvailabilityByDoctor, createAvailability, updateAvailability } from "@/lib/firestore"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "doctor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const availabilities = await getAvailabilityByDoctor(decoded.userId)

    return NextResponse.json({ availabilities })
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "doctor") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { date, startTime, endTime } = await request.json()

    // Check if availability already exists for this date
    const existingAvailabilities = await getAvailabilityByDoctor(decoded.userId)
    const existingAvailability = existingAvailabilities.find((avail: any) => {
      const availDate = avail.date instanceof Date ? avail.date : new Date(avail.date)
      return availDate.toDateString() === new Date(date).toDateString()
    })

    if (existingAvailability) {
      // Add time slot to existing availability
      const updatedTimeSlots = [...existingAvailability.timeSlots, { startTime, endTime, isBooked: false }]

      await updateAvailability(existingAvailability.id, {
        timeSlots: updatedTimeSlots,
      })
    } else {
      // Create new availability
      await createAvailability({
        doctorId: decoded.userId,
        date: new Date(date),
        timeSlots: [{ startTime, endTime, isBooked: false }],
      })
    }

    return NextResponse.json({ message: "Time slot added successfully" })
  } catch (error) {
    console.error("Error adding availability:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
