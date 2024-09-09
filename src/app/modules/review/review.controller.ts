import { RequestHandler } from "express";
import sendResponse from "../../utils/sendResponse";

import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { ReviewServices } from "./review.service";

//Create Review
const createReview: RequestHandler = async (req, res) => {
  const reviewData = req.body;
  const result = await (await ReviewServices.createReview(reviewData)).populate("car")

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is created successfully",
    data: result,
  });
};
//get all Reviews
const getAllReviews: RequestHandler = catchAsync(async (req, res) => {
 
  const result = await ReviewServices.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reviews are retrieved successfully",
    data: result,
  });
});

//get a single Review
const getAReview: RequestHandler = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAReview(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is retrieved successfully",
    data: result,
  });
});
//update a Review
const updateAReview: RequestHandler = catchAsync(async (req, res) => {
  const ReviewId = req.params.id;
  const updateData = req.body;

  const result = await ReviewServices.updateAReview(ReviewId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is updated successfully",
    data: result,
  });
});
// delete a Review
const deleteAReview: RequestHandler = catchAsync(async (req, res) => {
  const ReviewId = req.params.id;
  const result = await ReviewServices.deleteAReview(ReviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Review is deleted successfully",
    data: result,
  });
});

// ------------------------========================-----------------------------
export const ReviewControllers = {
  createReview,
  getAReview,
  updateAReview,
  deleteAReview,
  getAllReviews,
};
