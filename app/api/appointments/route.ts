import { type NextRequest, NextResponse } from "next/server"
import { createAppointment, getAvailabilityByDoctor, updateAvailability } from "@/lib/firestore"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { doctorId, date, timeSlot } = await request.json()

    // Check if slot is still available
    const availabilities = await getAvailabilityByDoctor(doctorId)
    const availability = availabilities.find((avail: any) => {
      const availDate = avail.date instanceof Date ? avail.date : new Date(avail.date)
      return availDate.toDateString() === new Date(date).toDateString()
    })

    if (!availability) {
      return NextResponse.json({ message: "No availability found" }, { status: 400 })
    }

    const slot = availability.timeSlots.find(
      (s: any) => s.startTime === timeSlot.startTime && s.endTime === timeSlot.endTime && !s.isBooked,
    )

    if (!slot) {
      return NextResponse.json({ message: "Time slot not available" }, { status: 400 })
    }

    // Create appointment
    const appointment = await createAppointment({
      userId: decoded.userId,
      doctorId,
      date: new Date(date),
      timeSlot,
      status: "confirmed",
    })

    // Mark slot as booked
    const updatedTimeSlots = availability.timeSlots.map((s: any) =>
      s.startTime === timeSlot.startTime && s.endTime === timeSlot.endTime ? { ...s, isBooked: true } : s,
    )

    await updateAvailability(availability.id, { timeSlots: updatedTimeSlots })

    return NextResponse.json({
      message: "Appointment booked successfully",
      appointment,
    })
  } catch (error) {
    console.error("Error booking appointment:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
