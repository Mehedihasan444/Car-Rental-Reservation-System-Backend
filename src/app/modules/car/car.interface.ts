import { Model } from "mongoose";

export interface TCar {
  name: string;
  description: string;
  color: string;
  engineType: string;
  status?: "available" | "booked" | "maintenance";
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
  year: number;
  noOfDoors: number;
}
export interface CarModel extends Model<TCar> {}
