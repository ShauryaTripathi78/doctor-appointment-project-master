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
} from "../mockData"

// ❗ MOCK MODE CONTROLLED BY .env ONLY
// ------------------------------------------------------------
const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true"
// ------------------------------------------------------------

// ----------------------------------------------
// USERS
// ----------------------------------------------

export async function createUser(data: any) {
  if (isMock) {
    const newUser = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date(),
    }
    mockUsers.push(newUser)
    return newUser
  }

  const docRef = await addDoc(collection(db, "users"), {
    ...data,
    createdAt: Timestamp.now(),
  })
  const snapshot = await getDoc(docRef)

  return { id: docRef.id, ...snapshot.data() }
}

export async function getUserByEmail(email: string) {
  if (isMock) return getMockUserByEmail(email)

  const q = query(collection(db, "users"), where("email", "==", email))
  const result = await getDocs(q)

  if (result.empty) return null
  return { id: result.docs[0].id, ...result.docs[0].data() }
}

export async function getUserById(id: string) {
  if (isMock) return getMockUserById(id)

  const snap = await getDoc(doc(db, "users", id))
  return snap.exists() ? { id, ...snap.data() } : null
}

export async function getUsersByRole(role: string) {
  if (isMock) return getMockUsersByRole(role)

  const q = query(collection(db, "users"), where("role", "==", role))
  const result = await getDocs(q)

  return result.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ----------------------------------------------
// APPOINTMENTS
// ----------------------------------------------

export async function createAppointment(data: any) {
  if (isMock) {
    const appointment = {
      id: String(Date.now()),
      ...data,
      createdAt: new Date(),
    }
    return appointment
  }

  const docRef = await addDoc(collection(db, "appointments"), {
    ...data,
    createdAt: Timestamp.now(),
  })

  const snapshot = await getDoc(docRef)
  return { id: docRef.id, ...snapshot.data() }
}

export async function getAppointmentsByUser(userId: string) {
  if (isMock) return getMockAppointmentsByUser(userId)

  const q = query(
    collection(db, "appointments"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  )

  const result = await getDocs(q)
  return result.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAppointmentsByDoctor(doctorId: string) {
  if (isMock) return getMockAppointmentsByDoctor(doctorId)

  const q = query(
    collection(db, "appointments"),
    where("doctorId", "==", doctorId),
    orderBy("createdAt", "desc")
  )

  const result = await getDocs(q)
  return result.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getAllAppointments() {
  if (isMock) return getMockAllAppointments()

  const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"))
  const result = await getDocs(q)

  return result.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ----------------------------------------------
// DOCTOR AVAILABILITY
// ----------------------------------------------

export async function getAvailabilityByDoctor(doctorId: string) {
  if (isMock) return getMockAvailabilityByDoctor(doctorId)

  const q = query(collection(db, "availability"), where("doctorId", "==", doctorId))
  const result = await getDocs(q)

  return result.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// ----------------------------------------------
// ADMIN DASHBOARD STATS
// ----------------------------------------------

export async function getStats() {
  if (isMock) return getMockStats()

  const usersSnap = await getDocs(collection(db, "users"))
  const appointmentsSnap = await getDocs(collection(db, "appointments"))

  return {
    totalUsers: usersSnap.size,
    totalAppointments: appointmentsSnap.size,
  }
}
