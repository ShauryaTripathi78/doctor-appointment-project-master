// -----------------------------
// UTIL HELPERS
// -----------------------------
function makeTimeSlot(time: string) {
  // Convert "10:00 AM" → "10:00"
  const clean = time.replace(/AM|PM/gi, "").trim();

  // Ensure HH:MM format
  const [h, m] = clean.split(":");
  const hour = String(h).padStart(2, "0");
  const minute = m ? String(m).padStart(2, "0") : "00";

  return {
    startTime: `${hour}:${minute}`,
    endTime: `${hour}:${minute}`,
    isBooked: false,
  };
}

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

// -----------------------------
// MOCK USERS
// -----------------------------
export const mockUsers = [
  {
    id: "admin1",
    name: "System Administrator",
    email: "admin@medicareplus.com",
    password: "admin123",
    role: "admin",
    phone: "9876543210",
    createdAt: new Date(),
  },

  {
    id: "doctor1",
    name: "Dr. Arjun Mehra",
    email: "doctor1@test.com",
    password: "doctor123",
    role: "doctor",
    specialization: "Cardiology",
    experience: 7,
    isApproved: true,
    phone: "9876543211",
    createdAt: new Date(),
  },

  {
    id: "patient1",
    name: "Riya Sharma",
    email: "riya@test.com",
    password: "patient123",
    role: "user",
    phone: "9876543212",
    createdAt: new Date(),
  },
];

// -----------------------------
// MOCK APPOINTMENTS
// -----------------------------
export const mockAppointments = [
  {
    id: "apt1",
    userId: "patient1",
    doctorId: "doctor1",
    date: todayPlus(0),
    timeSlot: makeTimeSlot("10:00 AM"),
    status: "confirmed",
    createdAt: new Date(),
  },

  {
    id: "apt2",
    userId: "patient1",
    doctorId: "doctor1",
    date: todayPlus(1),
    timeSlot: makeTimeSlot("02:00 PM"),
    status: "pending",
    createdAt: new Date(),
  },
];

// -----------------------------
// MOCK DOCTOR AVAILABILITY
// -----------------------------
export const mockAvailability = [
  {
    id: "avail1",
    doctorId: "doctor1",
    date: todayPlus(0),
    timeSlots: [
      makeTimeSlot("10:00 AM"),
      makeTimeSlot("11:00 AM"),
      makeTimeSlot("12:00 PM"),
    ],
    createdAt: new Date(),
  },

  {
    id: "avail2",
    doctorId: "doctor1",
    date: todayPlus(2),
    timeSlots: [makeTimeSlot("02:00 PM"), makeTimeSlot("03:00 PM")],
    createdAt: new Date(),
  },
];
