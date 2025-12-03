import mongoose, { Schema, Document, model } from "mongoose";

export interface ITimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface IAvailability extends Document {
  doctorId: string;
  date: Date;
  timeSlots: ITimeSlot[];
  createdAt: Date;
}

const AvailabilitySchema = new Schema<IAvailability>(
  {
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlots: [
      {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isBooked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Availability || model<IAvailability>("Availability", AvailabilitySchema);
