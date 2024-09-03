import { Schema, model } from "mongoose";
import { CarModel, TCar } from "./car.interface";

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
      default: "available",
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
    images: {
      type: [String],
      default: [],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
carSchema.pre("save", async function (next) {
  const isCarExists = await Car.findOne({ name: this.name });

  if (isCarExists) {
    throw new Error("Car is already exists !");
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

export const Car = model<TCar, CarModel>("Car", carSchema);
