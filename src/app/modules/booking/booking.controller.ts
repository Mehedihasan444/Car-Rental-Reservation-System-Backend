import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";
import { User } from "../user/user.model";
import { Types } from "mongoose";


//Create Booking
const createBooking: RequestHandler = async (req, res) => {
  const { carId, ...data} = req.body;
  const desireUser = await User.findOne({ email: req.user.email });

  const newData = {
    car :carId as Types.ObjectId,
    user: desireUser?._id as Types.ObjectId, 
  ...data,
  };
  const result = await BookingServices.createBooking(newData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message:"Car booked successfully",
    data: result,
  });
};
//get all Booking
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const queryData = req.query;
  const result = await BookingServices.getAllBookings(queryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});
//get a Booking
const getUsersBooking = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await BookingServices.getUsersBooking(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings are retrieved successfully",
    data: result,
  });
});
const returnTheCar: RequestHandler = catchAsync(async (req, res) => {
  const updateData = req.body;
  const result = await BookingServices.returnTheCar(updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car returned successfully",
    data: result,
  });
});

//update a Car
const updateBooking: RequestHandler =catchAsync( async (req, res) => {
  const bookingId = req.params.id;
  const updateData = req.body;

  const result = await BookingServices.updateBooking( bookingId, updateData );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is updated successfully",
    data: result,
  });
});
// delete a Booking
const deleteBooking: RequestHandler =catchAsync(async (req, res) => {
  const BookingId = req.params.id;
  const result = await BookingServices.deleteBooking(BookingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is deleted successfully",
    data: result,
  });
}) ;


export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUsersBooking,
  returnTheCar,
  updateBooking,
  deleteBooking,
};
