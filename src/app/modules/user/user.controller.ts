import {  RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { UserServices } from "./user.service";


//get all Users
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users are retrieved successfully",
    data: result,
  });
});

//get current user (me)
const getCurrentUser: RequestHandler = catchAsync(async (req, res) => {
  const { email } = req.user; // Get user email from JWT token (set by auth middleware)
  const result = await UserServices.getCurrentUser(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Current user is retrieved successfully",
    data: result,
  });
});

//get a single User
const getAUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.getAUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});
//update a User
const updateAUser: RequestHandler =catchAsync( async (req, res) => {
  const UserId = req.params.id;
  const updateData = req.body;

  const result = await UserServices.updateAUser( UserId, updateData );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is updated successfully",
    data: result,
  });
});
// delete a User
const deleteAUser: RequestHandler =catchAsync(async (req, res) => {
  const UserId = req.params.id;
  const result = await UserServices.deleteAUser(UserId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result,
  });
}) ;





// ------------------------========================-----------------------------
export const UserControllers = {
  getAUser,
  getCurrentUser,
  updateAUser,
  deleteAUser,
  getAllUsers,
};
