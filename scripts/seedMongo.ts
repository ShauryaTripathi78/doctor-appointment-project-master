// scripts/seedMongo.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Appointment from "../models/Appointment";
import Availability from "../models/Availability";
import { mockUsers, mockAppointments, mockAvailability } from "../lib/mockData";

function parseDate(val: any): Date {
  if (!val) return new Date();
  if (val instanceof Date) return val;
  // support strings like "2024-12-20" or "20 Dec 2024"
  const d = new Date(val);
  if (!isNaN(d.getTime())) return d;
  // fallback: try parse day names / custom formats later
  return new Date();
}

function normalizeTimeSlotFromString(timeStr: string) {
  // accepts "10:00-10:30", "10:00 - 10:30", "10:00/10:30"
  const parts = timeStr.split(/[-–—\/]/).map((s) => s.trim()).filter(Boolean);
  const start = parts[0] ?? "09:00";
  const end = parts[1] ?? start;
  return { startTime: start, endTime: end, isBooked: false };
}

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not set in environment");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB.");

  console.log("Clearing collections...");
  await User.deleteMany({});
  await Appointment.deleteMany({});
  await Availability.deleteMany({});

  console.log("Seeding users...");
  const userMap: Record<string, string> = {}; // mock id -> real _id string
  for (const u of mockUsers) {
    try {
      const hashedPassword = await bcrypt.hash(String(u.password || "password123"), 10);
      // keep other fields, but ensure createdAt not overwritten by mongoose timestamps unless provided
      const createData: any = { ...u, password: hashedPassword };
      // If mock has `createdAt` as Date, keep it; else let timestamps handle it
      if (u.createdAt) createData.createdAt = parseDate(u.createdAt);
      // Save (if your model requires role or phone, ensure mock has them)
      const created = await User.create(createData);
      userMap[u.id] = created.userID.toString();

    } catch (err) {
      console.warn("Failed to create user", u, err);
    }
  }

  console.log("Users seeded:", Object.keys(userMap).length);

  console.log("Seeding appointments...");
  for (const a of mockAppointments) {
    try {
      const userId = userMap[a.userId];
      const doctorId = userMap[a.doctorId];
      if (!userId || !doctorId) {
        console.warn("Skipping appointment - missing user/doctor mapping:", a);
        continue;
      }

      // normalize date
      const date = parseDate((a as any).date || (a as any).day || null);

      // determine timeSlot
      let timeSlot: any = null;
      if ((a as any).timeSlot) {
        // already the correct shape
        timeSlot = {
          startTime: (a as any).timeSlot.startTime,
          endTime: (a as any).timeSlot.endTime,
          isBooked: !!(a as any).timeSlot.isBooked,
        };
      } else if ((a as any).time) {
        if (typeof (a as any).time === "string") {
          timeSlot = normalizeTimeSlotFromString((a as any).time);
        } else if (Array.isArray((a as any).time) && (a as any).time.length) {
          timeSlot = normalizeTimeSlotFromString((a as any).time[0]);
        }
      } else if ((a as any).slots && Array.isArray((a as any).slots) && (a as any).slots.length) {
        // take first slot
        timeSlot = normalizeTimeSlotFromString((a as any).slots[0]);
      } else {
        // fallback slot
        timeSlot = { startTime: "09:00", endTime: "09:30", isBooked: false };
      }

      const createdAt = (a as any).createdAt ? parseDate((a as any).createdAt) : undefined;

      await Appointment.create({
        userId: String(userId),
        doctorId: String(doctorId),
        date,
        timeSlot,
        status: (a as any).status ?? "pending",
        ...(createdAt ? { createdAt } : {}),
      });
    } catch (err) {
      console.warn("Failed to create appointment", a, err);
    }
  }

  console.log("Seeding availability...");
  for (const avail of mockAvailability) {
    try {
      const doctorId = userMap[avail.doctorId];
      if (!doctorId) {
        console.warn("Skipping availability - missing doctor mapping:", avail);
        continue;
      }

      const date = parseDate((avail as any).date || (avail as any).day || null);

      let timeSlots: any[] = [];
      if ((avail as any).timeSlots && Array.isArray((avail as any).timeSlots)) {
        // Ensure each slot has startTime, endTime, isBooked
        timeSlots = (avail as any).timeSlots.map((s: any) => {
          if (typeof s === "string") return normalizeTimeSlotFromString(s);
          return {
            startTime: s.startTime ?? (s[0] ?? "09:00"),
            endTime: s.endTime ?? (s[1] ?? s.startTime ?? "09:30"),
            isBooked: !!s.isBooked,
          };
        });
      } else if ((avail as any).slots && Array.isArray((avail as any).slots)) {
        timeSlots = (avail as any).slots.map((s: any) =>
          typeof s === "string" ? normalizeTimeSlotFromString(s) : normalizeTimeSlotFromString(String(s))
        );
      } else {
        // fallback single slot
        timeSlots = [{ startTime: "09:00", endTime: "09:30", isBooked: false }];
      }

      const createdAt = (avail as any).createdAt ? parseDate((avail as any).createdAt) : undefined;

      await Availability.create({
        doctorId: String(doctorId),
        date,
        timeSlots,
        ...(createdAt ? { createdAt } : {}),
      });
    } catch (err) {
      console.warn("Failed to create availability", avail, err);
    }
  }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
