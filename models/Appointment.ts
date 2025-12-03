import mongoose, { Schema, Document, model } from "mongoose";

export interface ITimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IAppointment extends Document {
  userId: string;
  doctorId: string;
  date: Date;
  timeSlot: ITimeSlot;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
    },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Appointment || model<IAppointment>("Appointment", AppointmentSchema);
