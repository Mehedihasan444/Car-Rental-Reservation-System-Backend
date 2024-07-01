import { Types } from "mongoose";


export interface TBooking {
    date: string;
    user?: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime?: string;
    totalCost?: number;
    isBooked?: "unconfirmed" | "confirmed";
  }
  

export interface TCarReturn {
  bookingId: Types.ObjectId;
  endTime: string;
}

