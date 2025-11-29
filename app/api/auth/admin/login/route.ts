import { type NextRequest, NextResponse } from "next/server"
import { comparePassword, createToken } from "@/lib/auth"
import { getUserByEmail } from "@/lib/firestore"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find admin user
    const user = await getUserByEmail(email)
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
    }

    // Generate token
    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Set cookie
    const response = NextResponse.json({
      message: "Admin login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
