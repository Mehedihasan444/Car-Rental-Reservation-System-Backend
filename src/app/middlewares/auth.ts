import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token.split(" ")[1],
      config.jwt_access_secret as string
    ) as JwtPayload;
    const { role, email } = decoded;

    const normalizedRole = typeof role === "string" ? (role.toLowerCase() as TUserRole) : (role as TUserRole);

    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }
    if (requiredRoles.length && !requiredRoles.includes(normalizedRole)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route."
      );
    }

    req.user = {
      ...decoded,
      role: normalizedRole,
    } as JwtPayload;
    next();
  });
};

export default auth;
