import { Model, Number, Types } from "mongoose";


export interface TBooking {
    id: string;
    date: Date;
    user: Types.ObjectId;
    car: Types.ObjectId;
    startTime: Date;
    endTime: Date;
    totalCost: number;
    isBooked: "unconfirmed" | "confirmed";
  }
  

export interface BookingModel extends Model<TBooking>{
        //instance methods for checking if the car exist
        isCarExistsByCustomId(id: string): Promise<TBooking>;
        //instance methods for checking if passwords are matched
        isPasswordMatched(
          plainTextPassword: string,
          hashedPassword: string,
        ): Promise<boolean>;
        isJWTIssuedBeforePasswordChanged(
          passwordChangedTimestamp: Date,
          jwtIssuedTimestamp: number,
        ): boolean;
}