import { TBooking } from "./booking.interface";
import  { Booking } from "./booking.model";
import { User } from "../user/user.model";

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
    const desireUser:any= await User.findOne({email});

    const result = await Booking.find({user: desireUser._id})
      .populate('user')
      .populate("car");
    return result;
  };

  const returnTheCar = async ( updateData:any) => {
    const endTime = updateData.endTime;
    console.log(updateData)
    const result = await Booking.findByIdAndUpdate(
      updateData?.bookingId,
    { $set: {endTime}},
      { new: true }
    );
    return result;
  };
  export const BookingServices={
    getAllBookings,
    createBooking,
    getUsersBooking,
    returnTheCar
  }