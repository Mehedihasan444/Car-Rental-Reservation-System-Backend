import { Request, RequestHandler, Response } from "express";
import { CarValidation } from "./car.validation";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";
import catchAsync from "../../utils/catchAsync";

//Create Car
const createCar: RequestHandler = async (req, res) => {
  const carData = req.body;

  // data validation using zod
  const validationResult = CarValidation.carValidationSchema.parse(carData);

  const result = await CarServices.createCar(validationResult);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is created successfully",
    data: result,
  });
};
//get all cars
const getAllCars: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCars();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cars are retrieved successfully",
    data: result,
  });
});

//get a single car
const getACar: RequestHandler = catchAsync(async (req, res) => {
  const result = await CarServices.getACar(req.params.CarId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is created successfully",
    data: result,
  });
});
//update a Car
const updateACar: RequestHandler =catchAsync( async (req, res) => {
  const carId = req.params.CarId;
  const updateData = req.body;

  const result = await CarServices.updateACar( carId, updateData );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is updated successfully",
    data: result,
  });
});
// delete a Car
const deleteACar: RequestHandler =catchAsync(async (req, res) => {
  const CarId = req.params.CarId;
  const result = await CarServices.deleteACar(CarId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car is deleted successfully",
    data: result,
  });
}) ;

// ------------------------========================-----------------------------
export const CarControllers = {
  createCar,
  getACar,
  updateACar,
  deleteACar,
  getAllCars,
};
