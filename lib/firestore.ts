import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import {
  mockUsers,
  getMockUserByEmail,
  getMockUserById,
  getMockUsersByRole,
  getMockAppointmentsByUser,
  getMockAppointmentsByDoctor,
  getMockAllAppointments,
  getMockAvailabilityByDoctor,
  getMockStats,
} from "./mockData"

// Check if we're in development/preview mode
const isDevelopment = process.env.NODE_ENV === "development" || typeof window === "undefined"

// User operations
export const createUser = async (userData: any) => {
  if (isDevelopment) {
    // Mock implementation for v0 preview
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date(),
    }
    console.log("Mock: Created user", newUser)
    return newUser
  }

  try {
    const docRef = await addDoc(collection(db, "users"), {
      ...userData,
      createdAt: Timestamp.now(),
    })
    return { id: docRef.id, ...userData }
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

export const getUserById = async (userId: string) => {
  if (isDevelopment) {
    return getMockUserById(userId)
  }

  try {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting user:", error)
    throw error
  }
}

export const getUserByEmail = async (email: string) => {
  if (isDevelopment) {
    return getMockUserByEmail(email)
  }

  try {
    const q = query(collection(db, "users"), where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }
    return null
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

export const updateUser = async (userId: string, updateData: any) => {
  if (isDevelopment) {
    console.log("Mock: Updated user", userId, updateData)
    return true
  }

  try {
    const docRef = doc(db, "users", userId)
    await updateDoc(docRef, updateData)
    return true
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  if (isDevelopment) {
    console.log("Mock: Deleted user", userId)
    return true
  }

  try {
    await deleteDoc(doc(db, "users", userId))
    return true
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}

export const getAllUsers = async () => {
  if (isDevelopment) {
    return mockUsers
  }

  try {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting users:", error)
    throw error
  }
}

export const getUsersByRole = async (role: string) => {
  if (isDevelopment) {
    return getMockUsersByRole(role)
  }

  try {
    const q = query(collection(db, "users"), where("role", "==", role), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting users by role:", error)
    throw error
  }
}

// Appointment operations
export const createAppointment = async (appointmentData: any) => {
  if (isDevelopment) {
    const newAppointment = {
      id: `apt_${Date.now()}`,
      ...appointmentData,
      createdAt: new Date(),
    }
    console.log("Mock: Created appointment", newAppointment)
    return newAppointment
  }

  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      createdAt: Timestamp.now(),
    })
    return { id: docRef.id, ...appointmentData }
  } catch (error) {
    console.error("Error creating appointment:", error)
    throw error
  }
}

export const getAppointmentsByUser = async (userId: string) => {
  if (isDevelopment) {
    return getMockAppointmentsByUser(userId)
  }

  try {
    const q = query(collection(db, "appointments"), where("userId", "==", userId), orderBy("date", "asc"))
    const querySnapshot = await getDocs(q)

    const appointments = []
    for (const docSnap of querySnapshot.docs) {
      const appointmentData = { id: docSnap.id, ...docSnap.data() }

      // Get doctor details
      if (appointmentData.doctorId) {
        const doctorData = await getUserById(appointmentData.doctorId)
        appointmentData.doctorId = doctorData
      }

      appointments.push(appointmentData)
    }

    return appointments
  } catch (error) {
    console.error("Error getting user appointments:", error)
    throw error
  }
}

export const getAppointmentsByDoctor = async (doctorId: string) => {
  if (isDevelopment) {
    return getMockAppointmentsByDoctor(doctorId)
  }

  try {
    const q = query(collection(db, "appointments"), where("doctorId", "==", doctorId), orderBy("date", "asc"))
    const querySnapshot = await getDocs(q)

    const appointments = []
    for (const docSnap of querySnapshot.docs) {
      const appointmentData = { id: docSnap.id, ...docSnap.data() }

      // Get user details
      if (appointmentData.userId) {
        const userData = await getUserById(appointmentData.userId)
        appointmentData.userId = userData
      }

      appointments.push(appointmentData)
    }

    return appointments
  } catch (error) {
    console.error("Error getting doctor appointments:", error)
    throw error
  }
}

export const getAllAppointments = async () => {
  if (isDevelopment) {
    return getMockAllAppointments()
  }

  try {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)

    const appointments = []
    for (const docSnap of querySnapshot.docs) {
      const appointmentData = { id: docSnap.id, ...docSnap.data() }

      // Get user and doctor details
      if (appointmentData.userId) {
        const userData = await getUserById(appointmentData.userId)
        appointmentData.userId = userData
      }

      if (appointmentData.doctorId) {
        const doctorData = await getUserById(appointmentData.doctorId)
        appointmentData.doctorId = doctorData
      }

      appointments.push(appointmentData)
    }

    return appointments
  } catch (error) {
    console.error("Error getting all appointments:", error)
    throw error
  }
}

// Availability operations
export const createAvailability = async (availabilityData: any) => {
  if (isDevelopment) {
    const newAvailability = {
      id: `avail_${Date.now()}`,
      ...availabilityData,
      createdAt: new Date(),
    }
    console.log("Mock: Created availability", newAvailability)
    return newAvailability
  }

  try {
    const docRef = await addDoc(collection(db, "availability"), {
      ...availabilityData,
      createdAt: Timestamp.now(),
    })
    return { id: docRef.id, ...availabilityData }
  } catch (error) {
    console.error("Error creating availability:", error)
    throw error
  }
}

export const getAvailabilityByDoctor = async (doctorId: string) => {
  if (isDevelopment) {
    return getMockAvailabilityByDoctor(doctorId)
  }

  try {
    const q = query(collection(db, "availability"), where("doctorId", "==", doctorId), orderBy("date", "asc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting doctor availability:", error)
    throw error
  }
}

export const updateAvailability = async (availabilityId: string, updateData: any) => {
  if (isDevelopment) {
    console.log("Mock: Updated availability", availabilityId, updateData)
    return true
  }

  try {
    const docRef = doc(db, "availability", availabilityId)
    await updateDoc(docRef, updateData)
    return true
  } catch (error) {
    console.error("Error updating availability:", error)
    throw error
  }
}

// Statistics
export const getStats = async () => {
  if (isDevelopment) {
    return getMockStats()
  }

  try {
    const [usersSnapshot, doctorsSnapshot, appointmentsSnapshot] = await Promise.all([
      getDocs(query(collection(db, "users"), where("role", "==", "user"))),
      getDocs(query(collection(db, "users"), where("role", "==", "doctor"))),
      getDocs(collection(db, "appointments")),
    ])

    const pendingDoctorsSnapshot = await getDocs(
      query(collection(db, "users"), where("role", "==", "doctor"), where("isApproved", "==", false)),
    )

    // Get today's appointments
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayAppointmentsSnapshot = await getDocs(
      query(
        collection(db, "appointments"),
        where("date", ">=", Timestamp.fromDate(today)),
        where("date", "<", Timestamp.fromDate(tomorrow)),
      ),
    )

    return {
      totalUsers: usersSnapshot.size,
      totalDoctors: doctorsSnapshot.size,
      totalAppointments: appointmentsSnapshot.size,
      pendingApprovals: pendingDoctorsSnapshot.size,
      todayAppointments: todayAppointmentsSnapshot.size,
      activeUsers: usersSnapshot.size, // Simplified for now
    }
  } catch (error) {
    console.error("Error getting stats:", error)
    throw error
  }
}
