"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import { Users, Calendar, Clock, Shield, Search, Trash2, CheckCircle, Stethoscope } from "lucide-react"

interface User {
  _id: string
  name: string
  email: string
  role: string
  phone?: string
  createdAt: string
  isApproved?: boolean
  specialization?: string
  experience?: number
}

interface Appointment {
  _id: string
  userId: { name: string; email: string }
  doctorId: { name: string; specialization: string }
  date: string
  timeSlot: { startTime: string; endTime: string }
  status: string
  createdAt: string
}

interface Stats {
  totalUsers: number
  totalDoctors: number
  totalAppointments: number
  pendingApprovals: number
  todayAppointments: number
  activeUsers: number
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [doctors, setDoctors] = useState<User[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    pendingApprovals: 0,
    todayAppointments: 0,
    activeUsers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [usersRes, doctorsRes, appointmentsRes, statsRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/doctors"),
        fetch("/api/admin/appointments"),
        fetch("/api/admin/stats"),
      ])

      const usersData = await usersRes.json()
      const doctorsData = await doctorsRes.json()
      const appointmentsData = await appointmentsRes.json()
      const statsData = await statsRes.json()

      setUsers(usersData.users || [])
      setDoctors(doctorsData.doctors || [])
      setAppointments(appointmentsData.appointments || [])
      setStats(
        statsData.stats || {
          totalUsers: 0,
          totalDoctors: 0,
          totalAppointments: 0,
          pendingApprovals: 0,
          todayAppointments: 0,
          activeUsers: 0,
        },
      )
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

  const handleDeleteUser = async (userId: string, userType: string) => {
    if (!confirm(`Are you sure you want to delete this ${userType}?`)) return

    try {
      const endpoint = userType === "doctor" ? `/api/admin/doctors/${userId}` : `/api/admin/users/${userId}`
      const res = await fetch(endpoint, {
        method: "DELETE",
      })

      if (res.ok) {
        toast.success(`${userType} deleted successfully`)
        fetchData()
      } else {
        toast.error(`Failed to delete ${userType}`)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/admin/login"
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.specialization && doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">MediCare+ Administration Panel</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered patients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDoctors}</div>
              <p className="text-xs text-muted-foreground">Verified doctors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">Total bookings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Doctor approvals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">Appointments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="doctors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="doctors">Doctors Management</TabsTrigger>
            <TabsTrigger value="users">Users Management</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Doctors Management */}
          <TabsContent value="doctors">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Doctors Management</CardTitle>
                    <CardDescription>Manage doctor registrations and approvals</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDoctors.map((doctor) => (
                    <div key={doctor._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.email}</p>
                            <p className="text-sm text-blue-600">
                              {doctor.specialization} • {doctor.experience} years experience
                            </p>
                            <p className="text-xs text-gray-500">
                              Registered: {new Date(doctor.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doctor.isApproved ? "default" : "secondary"}>
                          {doctor.isApproved ? "Approved" : "Pending"}
                        </Badge>
                        {!doctor.isApproved && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveDoctor(doctor._id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleDeleteUser(doctor._id, "doctor")}>
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Management */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Users Management</CardTitle>
                    <CardDescription>Manage patient accounts and user data</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="user">Patients</SelectItem>
                        <SelectItem value="admin">Admins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-sm text-gray-600">{user.phone || "No phone"}</p>
                            <p className="text-xs text-gray-500">
                              Registered: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.role === "admin" ? "destructive" : "default"}>{user.role}</Badge>
                        {user.role !== "admin" && (
                          <Button size="sm" variant="outline" onClick={() => handleDeleteUser(user._id, "user")}>
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointments Management</CardTitle>
                <CardDescription>View and manage all appointments in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.slice(0, 20).map((appointment) => (
                    <div key={appointment._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {appointment.userId.name} → Dr. {appointment.doctorId.name}
                        </h3>
                        <p className="text-sm text-gray-600">{appointment.doctorId.specialization}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(appointment.date).toLocaleDateString()} •{appointment.timeSlot.startTime} -{" "}
                          {appointment.timeSlot.endTime}
                        </p>
                        <p className="text-xs text-gray-500">
                          Booked: {new Date(appointment.createdAt).toLocaleDateString()}
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
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Platform Users:</span>
                      <span className="font-semibold">{stats.totalUsers + stats.totalDoctors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Appointment Success Rate:</span>
                      <span className="font-semibold text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Response Time:</span>
                      <span className="font-semibold">2.3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Uptime:</span>
                      <span className="font-semibold text-green-600">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <span className="text-green-600">✓</span> New doctor registration approved
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-600">•</span> 15 appointments booked today
                    </div>
                    <div className="text-sm">
                      <span className="text-orange-600">!</span> 3 doctors pending approval
                    </div>
                    <div className="text-sm">
                      <span className="text-green-600">✓</span> System backup completed
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
