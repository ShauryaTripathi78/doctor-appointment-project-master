import { NextRequest, NextResponse } from "next/server"
import { comparePassword, createToken } from "@/lib/auth"
import { getUserByEmail } from "@/lib/mongo"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const valid = await comparePassword(password, user.password)
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
      },
    })

    res.cookies.set("token", token, {
  httpOnly: true,
  secure: false,   // important for localhost
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
})


    return res
  } catch (error) {
    console.log("Login error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
