import { Model, Types } from "mongoose";

export interface TCar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: "available" | "unavailable";
  features: Array<string>;
  pricePerHour: number;
  isDeleted?: boolean;
}
export interface CarModel extends Model<TCar> {}

export interface TCarReturn {
  bookingId: Types.ObjectId;
  endTime: string;
}
export interface CarReturnModel extends Model<TCarReturn> {}
