"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import toast from "react-hot-toast"

interface Appointment {
  _id: string
  doctorId: { name: string; specialization: string }
  date: string
  timeSlot: { startTime: string; endTime: string }
  status: string
}

export default function UserDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/user/appointments")
      const data = await res.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Button asChild>
          <Link href="/book">Book New Appointment</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Appointments</CardTitle>
          <CardDescription>View and manage your upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No appointments found</p>
              <Button asChild>
                <Link href="/book">Book Your First Appointment</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">Dr. {appointment.doctorId.name}</h3>
                    <p className="text-sm text-gray-600">{appointment.doctorId.specialization}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()} •{appointment.timeSlot.startTime} -{" "}
                      {appointment.timeSlot.endTime}
                    </p>
                  </div>
                  <Badge
                    variant={
                      appointment.status === "confirmed"
                        ? "default"
                        : appointment.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
