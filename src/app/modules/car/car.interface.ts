import { Model } from "mongoose";


export interface TCar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status?: "available" | "unavailable";
  features: Array<string>;
  pricePerHour: number;
  isDeleted?: boolean;
  type: string;
  brand: string;
  model: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  images: string[];
}
export interface CarModel extends Model<TCar> {}
