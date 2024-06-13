import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

//Create Booking
const createBooking: RequestHandler = async (req, res) => {
  const bookingData = req.body;
  const result = await BookingServices.createBooking(bookingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking is created successfully",
    data: result,
  });
};
//get all Booking
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking are retrieved successfully",
    data: result,
  });
});
//get a Booking
const getABooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getABooking(id);

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
  getABooking,
};
