import { Schema, model } from "mongoose";
import {  TBooking, TCarReturn } from "./booking.interface";


const bookingSchema = new Schema<TBooking>({

  date: {
    type: String,
    required:  [true, "Date id is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    // required: [true, "User id is required"],
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
// const carReturnSchema  = new Schema<TCarReturn>(
//   {
//       bookingId:{
//           type: Schema.Types.ObjectId,
//           required:[true, "Required bookingId"],
//           ref:"Booking"
//       },
//       endTime:{
//           type:String,
//           required:[true, "Required endTime"]
//       }
//   }
// )

// carSchema.pre("save", async function (next) {
//   const isBookingExists = await Booking.findById(this.bookingId );
//   console.log(isBookingExists);
//   if (!isBookingExists) {
//     throw new Error('Booking is not exists !');
//   }
//   next();
// });

// export const CarReturn = model<TCarReturn>("CarReturn", carReturnSchema);
