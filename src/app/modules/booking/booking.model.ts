import { Schema, model } from "mongoose";
import {  TBooking } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({

  date: {
    type: String,
    required:  [true, "Date id is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User id is required"],
    ref: "User",
  },
  car: {
    type: Schema.Types.ObjectId,
    required: [true, "Car id is required"],
    ref: "Car",
  },
  startTime: {
    type: String,
    required:  [true, "startTime id is required"],
  },
  endTime: {
    type: String,
    default:null
  },
  totalCost: {
    type: Number,
    default:0
  },
  isBooked: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
  },
},{
  timestamps: true,
});

export const Booking = model<TBooking>("Booking",bookingSchema)
