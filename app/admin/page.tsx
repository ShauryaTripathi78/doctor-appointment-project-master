"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import toast from "react-hot-toast"
import { Users, Calendar, Clock } from "lucide-react"

interface Doctor {
  _id: string
  name: string
  email: string
  specialization: string
  experience: number
  isApproved: boolean
}

interface Appointment {
  _id: string
  userId: { name: string }
  doctorId: { name: string }
  date: string
  timeSlot: { startTime: string; endTime: string }
  status: string
}

interface Stats {
  totalDoctors: number
  totalAppointments: number
  pendingApprovals: number
}

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState<Stats>({ totalDoctors: 0, totalAppointments: 0, pendingApprovals: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [doctorsRes, appointmentsRes, statsRes] = await Promise.all([
        fetch("/api/admin/doctors"),
        fetch("/api/admin/appointments"),
        fetch("/api/admin/stats"),
      ])

      const doctorsData = await doctorsRes.json()
      const appointmentsData = await appointmentsRes.json()
      const statsData = await statsRes.json()

      setDoctors(doctorsData.doctors || [])
      setAppointments(appointmentsData.appointments || [])
      setStats(statsData.stats || { totalDoctors: 0, totalAppointments: 0, pendingApprovals: 0 })
    } catch (error) {
      toast.error("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleApproveDoctor = async (doctorId: string) => {
    try {
      const res = await fetch(`/api/admin/doctors/${doctorId}/approve`, {
        method: "PATCH",
      })

      if (res.ok) {
        toast.success("Doctor approved successfully")
        fetchData()
      } else {
        toast.error("Failed to approve doctor")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleDeleteDoctor = async (doctorId: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return

    try {
      const res = await fetch(`/api/admin/doctors/${doctorId}`, {
        method: "DELETE",
      })

      if (res.ok) {
        toast.success("Doctor deleted successfully")
        fetchData()
      } else {
        toast.error("Failed to delete doctor")
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDoctors}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Doctors Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Doctors Management</CardTitle>
          <CardDescription>Approve or manage doctor registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.email}</p>
                  <p className="text-sm text-gray-600">
                    {doctor.specialization} • {doctor.experience} years
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={doctor.isApproved ? "default" : "secondary"}>
                    {doctor.isApproved ? "Approved" : "Pending"}
                  </Badge>
                  {!doctor.isApproved && (
                    <Button size="sm" onClick={() => handleApproveDoctor(doctor._id)}>
                      Approve
                    </Button>
                  )}
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteDoctor(doctor._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointments Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
          <CardDescription>Overview of all appointments in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.slice(0, 10).map((appointment) => (
              <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">
                    {appointment.userId.name} → {appointment.doctorId.name}
                  </h3>
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
