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
  user.password = "";
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      ...user.toObject(),
    },
    token: accessToken,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Refresh token missing",
      data: null,
    });
  }
  try {
    const accessToken = await AuthServices.refreshAccessToken(token);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Access token refreshed successfully!",
      data: null,
      token: accessToken,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid refresh token",
      data: null,
    });
  }
});

export const authControllers = {
  signup,
  signin,
  refreshToken,
};
