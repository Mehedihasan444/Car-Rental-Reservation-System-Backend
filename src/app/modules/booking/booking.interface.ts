import { Model, Number, Types } from "mongoose";


export interface TBooking {
    date: string;
    user?: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime?: string;
    totalCost?: number;
    isBooked?: "unconfirmed" | "confirmed";
  }
  

// export interface BookingModel extends Model<TBooking>{
//         //instance methods for checking if the car exist
//         // isCarExistsByCustomId(id: string): Promise<TBooking>;
// }

export interface TCarReturn {
  bookingId: Types.ObjectId;
  endTime: string;
}
