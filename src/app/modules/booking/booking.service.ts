import { TBooking } from "./booking.interface";
import  { Booking } from "./booking.model";

const getAllBookings = async () => {
    const result = await Booking.find();
    return result;
  };


  const createBooking = async (payload: TBooking) => {
    const result = await Booking.create(payload);
    return result;
  };


  export const BookingServices={
    getAllBookings,
    createBooking,
  }