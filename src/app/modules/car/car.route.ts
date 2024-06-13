import express from "express";
import { CarControllers } from "./car.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CarValidation } from "./car.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(CarValidation.carValidationSchema),
  CarControllers.createCar
);
router.get("/", CarControllers.getAllCars);
router.get("/:id", CarControllers.getACar);
router.delete("/:id", CarControllers.deleteACar);
router.put("/:id",validateRequest(CarValidation.updateCarValidationSchema) ,CarControllers.updateACar);
router.put("/return",validateRequest(CarValidation.carReturnValidationSchema) ,CarControllers.returnTheCar);

export const CarRoutes = router;
