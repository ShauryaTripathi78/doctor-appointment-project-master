// Mock data for v0 preview environment
export const mockUsers = [
  {
    id: "admin1",
    name: "System Administrator",
    email: "admin@medicareplus.com",
    password: "hashed_admin123", // Simple hash for demo
    role: "admin",
    phone: "+1-555-0000",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "doctor1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medicareplus.com",
    password: "hashed_doctor123",
    role: "doctor",
    specialization: "Cardiologist",
    experience: 15,
    isApproved: true,
    phone: "+1-555-0001",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "doctor2",
    name: "Dr. Michael Chen",
    email: "michael.chen@medicareplus.com",
    password: "hashed_doctor123",
    role: "doctor",
    specialization: "Neurologist",
    experience: 12,
    isApproved: true,
    phone: "+1-555-0002",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "doctor3",
    name: "Dr. Emily Davis",
    email: "emily.davis@medicareplus.com",
    password: "hashed_doctor123",
    role: "doctor",
    specialization: "Pediatrician",
    experience: 10,
    isApproved: false,
    phone: "+1-555-0003",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "user1",
    name: "John Smith",
    email: "john.smith@example.com",
    password: "hashed_user123",
    role: "user",
    phone: "+1-555-1001",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "user2",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "hashed_user123",
    role: "user",
    phone: "+1-555-1002",
    createdAt: new Date("2024-01-25"),
  },
]

export const mockAppointments = [
  {
    id: "apt1",
    userId: "user1",
    doctorId: "doctor1",
    date: new Date("2024-12-20"),
    timeSlot: { startTime: "10:00", endTime: "10:30" },
    status: "confirmed",
    createdAt: new Date("2024-12-15"),
  },
  {
    id: "apt2",
    userId: "user2",
    doctorId: "doctor2",
    date: new Date("2024-12-21"),
    timeSlot: { startTime: "14:00", endTime: "14:30" },
    status: "confirmed",
    createdAt: new Date("2024-12-16"),
  },
  {
    id: "apt3",
    userId: "user1",
    doctorId: "doctor1",
    date: new Date("2024-12-18"),
    timeSlot: { startTime: "09:00", endTime: "09:30" },
    status: "pending",
    createdAt: new Date("2024-12-17"),
  },
]

export const mockAvailability = [
  {
    id: "avail1",
    doctorId: "doctor1",
    date: new Date("2024-12-20"),
    timeSlots: [
      { startTime: "09:00", endTime: "09:30", isBooked: false },
      { startTime: "10:00", endTime: "10:30", isBooked: true },
      { startTime: "11:00", endTime: "11:30", isBooked: false },
      { startTime: "14:00", endTime: "14:30", isBooked: false },
    ],
    createdAt: new Date("2024-12-15"),
  },
  {
    id: "avail2",
    doctorId: "doctor2",
    date: new Date("2024-12-21"),
    timeSlots: [
      { startTime: "10:00", endTime: "10:30", isBooked: false },
      { startTime: "11:00", endTime: "11:30", isBooked: false },
      { startTime: "14:00", endTime: "14:30", isBooked: true },
      { startTime: "15:00", endTime: "15:30", isBooked: false },
    ],
    createdAt: new Date("2024-12-16"),
  },
]

// Helper functions for mock data
export const getMockUserByEmail = (email: string) => {
  return mockUsers.find((user) => user.email === email) || null
}

export const getMockUserById = (id: string) => {
  return mockUsers.find((user) => user.id === id) || null
}

export const getMockUsersByRole = (role: string) => {
  return mockUsers.filter((user) => user.role === role)
}

export const getMockAppointmentsByUser = (userId: string) => {
  return mockAppointments
    .filter((apt) => apt.userId === userId)
    .map((apt) => ({
      ...apt,
      userId: getMockUserById(apt.userId),
      doctorId: getMockUserById(apt.doctorId),
    }))
}

export const getMockAppointmentsByDoctor = (doctorId: string) => {
  return mockAppointments
    .filter((apt) => apt.doctorId === doctorId)
    .map((apt) => ({
      ...apt,
      userId: getMockUserById(apt.userId),
      doctorId: getMockUserById(apt.doctorId),
    }))
}

export const getMockAllAppointments = () => {
  return mockAppointments.map((apt) => ({
    ...apt,
    userId: getMockUserById(apt.userId),
    doctorId: getMockUserById(apt.doctorId),
  }))
}

export const getMockAvailabilityByDoctor = (doctorId: string) => {
  return mockAvailability.filter((avail) => avail.doctorId === doctorId)
}

export const getMockStats = () => {
  const totalUsers = mockUsers.filter((u) => u.role === "user").length
  const totalDoctors = mockUsers.filter((u) => u.role === "doctor" && u.isApproved).length
  const pendingApprovals = mockUsers.filter((u) => u.role === "doctor" && !u.isApproved).length
  const totalAppointments = mockAppointments.length
  const todayAppointments = mockAppointments.filter((apt) => {
    const today = new Date()
    return apt.date.toDateString() === today.toDateString()
  }).length

  return {
    totalUsers,
    totalDoctors,
    totalAppointments,
    pendingApprovals,
    todayAppointments,
    activeUsers: totalUsers,
  }
}
