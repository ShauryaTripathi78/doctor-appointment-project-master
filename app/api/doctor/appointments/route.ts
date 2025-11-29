import { type NextRequest, NextResponse } from "next/server"
import { getAppointmentsByDoctor } from "@/lib/firestore"
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

    const appointments = await getAppointmentsByDoctor(decoded.userId)

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
