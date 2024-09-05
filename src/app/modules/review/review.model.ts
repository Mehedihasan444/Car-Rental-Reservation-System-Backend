import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    car: {
        type: Schema.Types.ObjectId,
        required: [true, "Car id is required"],
        ref: "Car",
      },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Review = model<TReview>("Review", reviewSchema);
