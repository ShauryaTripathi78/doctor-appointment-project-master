import { type NextRequest, NextResponse } from "next/server"
import { updateUser } from "@/lib/firestore"
import { verifyToken } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    await updateUser(params.id, { isApproved: true })

    return NextResponse.json({ message: "Doctor approved successfully" })
  } catch (error) {
    console.error("Error approving doctor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
