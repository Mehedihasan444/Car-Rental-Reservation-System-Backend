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

  const getABooking = async (id: string) => {
    const result = await Booking.findById(id)
      .populate('user')
      .populate("car");
    return result;
  };
  export const BookingServices={
    getAllBookings,
    createBooking,
    getABooking
  }