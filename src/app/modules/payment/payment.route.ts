import express from "express";
import { paymentControllers } from "./payment.controller";

const router = express.Router();

router.post("/", paymentControllers.makePayment);
router.post("/confirmation", paymentControllers.paymentConfirmation);
router.post("/failed", paymentControllers.paymentFailed);

export const PaymentRoutes = router;
