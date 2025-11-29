"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Stethoscope, Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

export default function DoctorLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        if (data.user.role === "doctor") {
          toast.success("Doctor login successful!")
          router.push("/doctor/dashboard")
        } else {
          toast.error("Access denied. Doctor credentials required.")
        }
      } else {
        toast.error(data.message || "Login failed")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-teal-900">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Stethoscope className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Doctor Portal</CardTitle>
            <CardDescription className="text-gray-600">Access your medical practice dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Doctor Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@medicareplus.com"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? "Signing in..." : "Sign In to Doctor Portal"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500">
                Not a doctor?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                  Patient Login
                </Link>
                {" | "}
                <Link href="/admin/login" className="text-green-600 hover:underline">
                  Admin Login
                </Link>
              </div>
              <div className="mt-2">
                <Link href="/register" className="text-sm text-green-600 hover:underline">
                  Register as a Doctor
                </Link>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-800">
                <strong>Note:</strong> Doctor accounts require admin approval before access is granted.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white text-sm">
            <Activity className="h-4 w-4 mr-2" />
            Back to MediCare+
          </Link>
        </div>
      </div>
    </div>
  )
}
