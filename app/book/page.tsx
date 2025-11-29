"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"

interface Doctor {
  _id: string
  name: string
  specialization: string
  experience: number
}

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

export default function BookAppointment() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [availabilities, setAvailabilities] = useState<Availability[]>([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDoctors()
  }, [])

  useEffect(() => {
    if (selectedDoctor) {
      fetchAvailability()
    }
  }, [selectedDoctor])

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/doctors")
      const data = await res.json()
      setDoctors(data.doctors || [])
    } catch (error) {
      toast.error("Failed to fetch doctors")
    }
  }

  const fetchAvailability = async () => {
    try {
      const res = await fetch(`/api/doctors/${selectedDoctor}/availability`)
      const data = await res.json()
      setAvailabilities(data.availabilities || [])
    } catch (error) {
      toast.error("Failed to fetch availability")
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      toast.error("Please select all required fields")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          date: selectedDate,
          timeSlot: selectedSlot,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Appointment booked successfully!")
        // Reset form
        setSelectedDoctor("")
        setSelectedDate("")
        setSelectedSlot(null)
        setAvailabilities([])
      } else {
        toast.error(data.message || "Failed to book appointment")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const getAvailableSlots = () => {
    const availability = availabilities.find((a) => a.date === selectedDate)
    return availability ? availability.timeSlots.filter((slot) => !slot.isBooked) : []
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>Select a doctor, date, and time for your appointment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Select Doctor */}
          <div>
            <Label htmlFor="doctor">Select Doctor</Label>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor._id} value={doctor._id}>
                    Dr. {doctor.name} - {doctor.specialization} ({doctor.experience} years)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Date */}
          {selectedDoctor && (
            <div>
              <Label htmlFor="date">Select Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a date" />
                </SelectTrigger>
                <SelectContent>
                  {availabilities.map((availability) => (
                    <SelectItem key={availability._id} value={availability.date}>
                      {new Date(availability.date).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Select Time Slot */}
          {selectedDate && (
            <div>
              <Label>Select Time Slot</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {getAvailableSlots().map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    onClick={() => setSelectedSlot(slot)}
                    className="justify-center"
                  >
                    {slot.startTime} - {slot.endTime}
                  </Button>
                ))}
              </div>
              {getAvailableSlots().length === 0 && (
                <p className="text-sm text-gray-500 mt-2">No available slots for this date</p>
              )}
            </div>
          )}

          {/* Book Button */}
          <Button
            onClick={handleBookAppointment}
            disabled={!selectedDoctor || !selectedDate || !selectedSlot || loading}
            className="w-full"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
