import { NextResponse } from "next/server"
import { getUsersByRole } from "@/lib/firestore"

export async function GET() {
  try {
    const allDoctors = await getUsersByRole("doctor")
    const doctors = allDoctors.filter((doctor: any) => doctor.isApproved === true)

    return NextResponse.json({ doctors })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
