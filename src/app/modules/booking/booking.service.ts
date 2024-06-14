import { Types } from "mongoose";
import { TBooking } from "./booking.interface";
import  { Booking } from "./booking.model";



const getAllBookings = async (queryData:any) => {
  const data:any={}
  
    if (queryData.carId) {
      data.carId = queryData.carId
    }
    if (queryData.date) {
      data.date = queryData.date
    }
       const result = await Booking.find(data)
     .populate('user')
    .populate("car");;
    
  
    return result;
    
   
  };


  const createBooking = async (payload: TBooking) => {
  
    const result = await Booking.create(payload)

      const result1 = await Booking.findById(result._id)
      .populate('user')
      .populate("car");
    return result1;
  };

  const getUsersBooking = async (email: string) => {
    const result = await Booking.find({email})
      .populate('user')
      .populate("car");
    return result;
  };
  export const BookingServices={
    getAllBookings,
    createBooking,
    getUsersBooking
  }