import { type NextRequest, NextResponse } from "next/server"
import { getAvailabilityByDoctor } from "@/lib/firestore"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const availabilities = await getAvailabilityByDoctor(params.id)

    // Filter future dates only
    const futureAvailabilities = availabilities.filter((availability: any) => {
      const availDate = availability.date.toDate()
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return availDate >= today
    })

    return NextResponse.json({ availabilities: futureAvailabilities })
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
