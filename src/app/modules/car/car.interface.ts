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


