import { type NextRequest, NextResponse } from "next/server"
import { deleteUser } from "@/lib/firestore"
import { verifyToken } from "@/lib/auth"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    await deleteUser(params.id)

    return NextResponse.json({ message: "Doctor deleted successfully" })
  } catch (error) {
    console.error("Error deleting doctor:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
