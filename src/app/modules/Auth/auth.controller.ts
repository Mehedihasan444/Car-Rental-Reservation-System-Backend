import httpStatus from "http-status";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const signup = catchAsync(async (req, res) => {
  const result = await AuthServices.signup(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signuped successfully!",
    data: result,
  });
});

const signin = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await AuthServices.signin(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      ...user.toObject()
    },
    accessToken: accessToken.split(" ")[1],
  });
});

export const authControllers = {
  signup,
  signin,
};
