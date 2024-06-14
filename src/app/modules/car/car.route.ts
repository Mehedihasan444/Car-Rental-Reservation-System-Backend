import express from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidation } from "./car.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidation.carValidationSchema),
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getACar);
router.delete("/:id",auth(USER_ROLE.admin) , CarControllers.deleteACar);
router.put("/:id",validateRequest(CarValidation.updateCarValidationSchema),auth(USER_ROLE.admin) ,CarControllers.updateACar);
router.put("/return",validateRequest(CarValidation.carReturnValidationSchema) ,auth(USER_ROLE.admin),CarControllers.returnTheCar);

export const CarRoutes = router;
