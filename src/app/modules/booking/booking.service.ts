import { TBooking } from "./booking.interface";
import  { Booking } from "./booking.model";

const getAllBookings = async () => {
    const result = await Booking.find()
     // .populate('user')
    .populate("car");;
    return result;
  };


  const createBooking = async (payload: TBooking) => {
    const result = await Booking.create(payload)

      const result1 = await Booking.findById(result._id)
      // .populate('user')
      .populate("car");
    return result1;
  };

  const getABooking = async (id: string) => {
    const result = await Booking.findById(id)
      // .populate('user')
      .populate("car");
    return result;
  };
  export const BookingServices={
    getAllBookings,
    createBooking,
    getABooking
  }