import { Schema } from "mongoose";
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
    ref: "user",
  },
  car: {
    type: Schema.Types.ObjectId,
    required: [true, "Car id is required"],
    unique: true,
    ref: "car",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
    required: true,
  },
});

export default bookingSchema;
