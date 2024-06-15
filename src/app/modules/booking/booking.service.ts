import { TBooking, TCarReturn } from "./booking.interface";
import { Booking } from "./booking.model";
import { User } from "../user/user.model";
import { Car } from "../car/car.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getAllBookings = async (queryData: any) => {
  const data: any = {};
  if (queryData.carId) {
    data.carId = queryData.carId;
  }
  if (queryData.date) {
    data.date = queryData.date;
  }
  const result = await Booking.find(data).populate("user").populate("car");
  return result;
};

const createBooking = async (payload: TBooking) => {
  const result = await Booking.create(payload);

  const result1 = await Booking.findById(result._id)
    .populate("user")
    .populate("car");
  return result1;
};

const getUsersBooking = async (email: string) => {
  const desireUser: any = await User.findOne({ email });

  const result = await Booking.find({ user: desireUser._id })
    .populate("user")
    .populate("car");
  return result;
};

const returnTheCar = async (updateData: TCarReturn) => {
  const endTime = updateData.endTime;
  // get the specific bookings from the database
  const booking: any = await Booking.findById(updateData?.bookingId);
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Cannot find booking");
  }

  // get the specific car from the database
  const car: any = await Car.findById(booking?.car);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Cannot find car");
  }
  // Extract hours and minutes from time strings
  const [startHour, startMinute] = booking.startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Create Date objects
  const start = new Date(1970, 0, 1, startHour, startMinute);
  const end = new Date(1970, 0, 1, endHour, endMinute);

  // Calculate the difference in hours
  const hours = Math.abs(end.getTime() - start.getTime()) / 36e5;

  // Calculate the total cost
  const totalCost = hours * car.pricePerHour;

  const result = await Booking.findByIdAndUpdate(
    updateData?.bookingId,
    { $set: { endTime, totalCost } },
    { new: true }
  )
    .populate("user")
    .populate("car");
  return result;
};
export const BookingServices = {
  getAllBookings,
  createBooking,
  getUsersBooking,
  returnTheCar,
};
