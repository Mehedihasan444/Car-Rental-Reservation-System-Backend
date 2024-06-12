import { Schema, model } from "mongoose";
import { BookingModel, TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking, BookingModel>({
  id: {
    type: String,
    required: [true, "ID is required"],
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    unique: true,
    ref: "User",
  },
  car: {
    type: Schema.Types.ObjectId,
    required: [true, "Car id is required"],
    unique: true,
    ref: "Car",
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
    default:null
  },
  totalCost: {
    type: Number,
    required: true,
    default:0
  },
  isBooked: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
    required: true,
  },
},{
  timestamps: true,
});

export const Booking = model<TBooking>("Booking",bookingSchema)
