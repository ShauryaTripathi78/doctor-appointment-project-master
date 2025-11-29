"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"
import { Calendar, Clock, Plus } from "lucide-react"

interface TimeSlot {
  startTime: string
  endTime: string
  isBooked: boolean
}

interface Availability {
  _id: string
  date: string
  timeSlots: TimeSlot[]
}

interface Appointment {
  _id: string
  userId: { name: string; email: string }
  date: string
  timeSlot: { startTime: string; endTime: string }
  status: string
}

export default function DoctorDashboard() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [availabilityRes, appointmentsRes] = await Promise.all([
        fetch("/api/doctor/availability"),
        fetch("/api/doctor/appointments"),
      ])

      const availabilityData = await availabilityRes.json()
      const appointmentsData = await appointmentsRes.json()

      setAvailabilities(availabilityData.availabilities || [])
      setAppointments(appointmentsData.appointments || [])
    } catch (error) {
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddTimeSlot = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/doctor/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSlot),
      })

      if (res.ok) {
        toast.success("Time slot added successfully")
        setNewSlot({ date: "", startTime: "", endTime: "" })
        fetchData()
      } else {
        const data = await res.json()
        toast.error(data.message || "Failed to add time slot")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

      {/* Add Availability */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Available Time Slot
          </CardTitle>
          <CardDescription>Set your available times for appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTimeSlot} className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newSlot.date}
                onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={newSlot.startTime}
                onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={newSlot.endTime}
                onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                required
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">
                Add Slot
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Available Slots */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Your Available Slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availabilities.map((availability) => (
              <div key={availability._id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{new Date(availability.date).toLocaleDateString()}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availability.timeSlots.map((slot, index) => (
                    <Badge key={index} variant={slot.isBooked ? "destructive" : "default"} className="justify-center">
                      {slot.startTime} - {slot.endTime}
                      {slot.isBooked && " (Booked)"}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Your Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{appointment.userId.name}</h3>
                  <p className="text-sm text-gray-600">{appointment.userId.email}</p>
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
        </CardContent>
      </Card>
    </div>
  )
}
