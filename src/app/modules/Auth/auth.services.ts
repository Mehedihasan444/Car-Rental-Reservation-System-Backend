/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TsigninUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
import { isPasswordMatched } from "./auth.util";

const signup = async (payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error("User already exists");
  }
  //create user
  const newUser = await User.create(payload);

  return newUser;
};

const signin = async (payload: TsigninUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }
  if (user?.status === "blocked") {
    throw new Error("Your account has been blocked. Please contact support for assistance.");
  }
  
  
  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const decoded = jwt.verify(refreshToken, config.jwt_refresh_secret as string) as jwt.JwtPayload;
    const { email, role } = decoded;
    // Optionally, check user existence/status
    const user = await User.findOne({ email });
    if (!user || user.status === "blocked") {
      throw new Error("User not found or blocked");
    }
    const jwtPayload = { email, role };
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: config.jwt_access_expires_in,
    });
    return accessToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const AuthServices = {
  signup,
  signin,
  refreshAccessToken,
};
