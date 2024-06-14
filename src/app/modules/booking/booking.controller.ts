import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

//Create Booking
const createBooking: RequestHandler = async (req, res) => {
  const bookingData = req.body;
  const newData={
    ...bookingData,
    user:req.user
  }
  const result = await BookingServices.createBooking(newData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is created successfully",
    data: result,
  });
};
//get all Booking
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const queryData= req.query
  const result = await BookingServices.getAllBookings(queryData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking are retrieved successfully",
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
    message: "Booking is retrieved succesfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUsersBooking,
};
