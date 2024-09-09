"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post("/", payment_controller_1.paymentControllers.makePayment);
router.post("/confirmation", payment_controller_1.paymentControllers.paymentConfirmation);
router.post("/failed", payment_controller_1.paymentControllers.paymentFailed);
exports.PaymentRoutes = router;
