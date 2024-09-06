import { Types } from "mongoose";


export interface TBooking {
    date: string;
    user?: Types.ObjectId;
    car: Types.ObjectId;
    startTime: string;
    endTime?: string;
    totalCost?: number;
    isBooked?: "unconfirmed" | "confirmed";
    payment?: string
    transactionId?: string
    returnDate?: string;
    pickupLocation:string
    destination:string;
    additionalFeatures: {
      childSeat: boolean,
      gps: boolean,
      insurance: boolean,
    },
    bookedUserInfo:{
      userName: string,
      email: string,
      phone: string,
      nid: string,
      drivingLicense?: string
    }
  }
  

export interface TCarReturn {
  bookingId: Types.ObjectId;
  endTime: string;
}

