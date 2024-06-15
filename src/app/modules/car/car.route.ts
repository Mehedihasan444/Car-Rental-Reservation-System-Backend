import express from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidation } from "./car.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import {  bookingValidations } from "../booking/booking.validation";
import { BookingControllers } from "../booking/booking.controller";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.carValidationSchema),
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getACar);
router.put(
  "/return",
  validateRequest(bookingValidations.carReturnValidationSchema),
  auth(USER_ROLE.admin),
  BookingControllers.returnTheCar
);
router.put(
  "/:id",
  validateRequest(CarValidation.updateCarValidationSchema),
  auth(USER_ROLE.admin),
  CarControllers.updateACar
);
router.delete("/:id", auth(USER_ROLE.admin), CarControllers.deleteACar);

export const CarRoutes = router;
