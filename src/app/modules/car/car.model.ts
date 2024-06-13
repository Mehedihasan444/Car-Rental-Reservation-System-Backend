import { Schema, model } from "mongoose";
import { CarModel, CarReturnModel, TCar, TCarReturn } from "./car.interface";
import { Booking } from "../booking/booking.model";

const carSchema = new Schema<TCar, CarModel>(
  {
    name: {
      type: String,
      required: [true, "Required Name"],
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isElectric: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
carSchema.pre("save", async function (next) {
  const isCarExists = await Car.findOne({ name: this.name });
  
  if (isCarExists) {
    throw new Error('Car is already exists !');
  }
  next();
});
carSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// //creating a custom static method
// carSchema.statics.isCarExists = async function (id: string) {
//   const existingCar = await Car.findOne({ id });
//   return existingCar;
// };

const carReturnSchema  = new Schema<TCarReturn,CarReturnModel>(
  {
      bookingId:{
          type:Schema.Types.ObjectId,
          required:[true, "Required bookingId"]
      },
      endTime:{
          type:String,
          required:[true, "Required endTime"]
      }
  }
)

carReturnSchema.pre("save", async function (next) {
  const isBookingExists = await Booking.findOne({ _id: this.bookingId });
  
  if (!isBookingExists) {
    throw new Error('Booking is not exists !');
  }
  next();
});

export const Car = model<TCar, CarModel>("Car", carSchema);
export const CarReturn = model<TCarReturn, CarReturnModel>("Car", carReturnSchema);
