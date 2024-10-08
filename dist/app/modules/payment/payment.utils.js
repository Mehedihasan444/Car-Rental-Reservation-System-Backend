"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initiatePayment = exports.generateTransactionId = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const generateTransactionId = () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base-36 string
    const randomNum = Math.floor(Math.random() * 1e12).toString(36); // Generate a random number and convert to base-36
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
    return `TX-${timestamp}-${randomNum}-${randomString}`.toUpperCase(); // Combine parts and return in uppercase
};
exports.generateTransactionId = generateTransactionId;
const initiatePayment = (paymentData, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalCost, customerName, customerEmail, customerPhone, customerAddress, } = paymentData;
    const transactionId = (0, exports.generateTransactionId)();
    const response = yield axios_1.default.post(process.env.PAYMENT_URL, {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        tran_id: transactionId,
        success_url: `https://car-rental-reservation-system-backend-sigma.vercel.app/api/payment/confirmation?transactionId=${transactionId}&bookingId=${bookingId}`,
        fail_url: `https://car-rental-reservation-system-backend-sigma.vercel.app/api/payment/failed?transactionId=${transactionId}&bookingId=${bookingId}`,
        cancel_url: "https://car-rental-reservation-system-frontend-tau.vercel.app/",
        amount: totalCost,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: customerName,
        cus_email: customerEmail,
        cus_add1: `${customerAddress === "Update your address!" ? "N/A" : customerAddress}`,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "Bangladesh",
        cus_phone: `${customerPhone === "Update your address!" ? "N/A" : customerPhone}`,
        type: "json",
    });
    return response.data;
});
exports.initiatePayment = initiatePayment;
const verifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(process.env.PAYMENT_VERIFY_URL, {
        params: {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNATURE_KEY,
            request_id: transactionId,
            type: "json",
        }
    });
    return response.data;
});
exports.verifyPayment = verifyPayment;
