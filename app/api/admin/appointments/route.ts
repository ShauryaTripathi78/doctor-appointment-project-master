import { type NextRequest, NextResponse } from "next/server"
import { getAllAppointments } from "@/lib/firestore"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const appointments = await getAllAppointments()

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
