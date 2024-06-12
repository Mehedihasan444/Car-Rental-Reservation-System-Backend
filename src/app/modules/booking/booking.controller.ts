import { RequestHandler } from "express";
import { bookingValidations } from "./booking.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

//Create Booking
const createBooking: RequestHandler = async (req, res) => {
    const bookingData = req.body;
  
    // data validation using zod
    const validationResult = bookingValidations.BookingValidationSchema.parse(bookingData);
  
    const result = await BookingServices.createBooking(validationResult);
  
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




export const BookingControllers={
    createBooking,
    getAllBookings,
}