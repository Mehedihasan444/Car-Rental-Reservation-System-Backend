import express from "express";
import { paymentControllers } from "./payment.controller";

const router = express.Router();

router.post(
  "/",
  //   validateRequest(UserValidation.signInUserValidationSchema),
  paymentControllers.makePayment
);
router.post(
  "/confirmation",
  //   validateRequest(UserValidation.signInUserValidationSchema),
  paymentControllers.paymentConfirmation
);
router.post(
  "/failed",
  //   validateRequest(UserValidation.signInUserValidationSchema),
  paymentControllers.paymentFailed
);

export const PaymentRoutes = router;
