import { type NextRequest, NextResponse } from "next/server"
import { hashPassword } from "@/lib/auth"
import { createUser, getUserByEmail } from "@/lib/firestore"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, role, specialization, experience } = await request.json()

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user data
    const userData: any = {
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    }

    if (role === "doctor") {
      userData.specialization = specialization
      userData.experience = Number.parseInt(experience)
      userData.isApproved = false
    }

    const user = await createUser(userData)

    return NextResponse.json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
