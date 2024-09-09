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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const booking_model_1 = require("../booking/booking.model");
const payment_utils_1 = require("./payment.utils");
const makePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const bookingId = payload._id;
    const paymentData = {
        totalCost: payload === null || payload === void 0 ? void 0 : payload.totalCost,
        customerName: (_a = payload === null || payload === void 0 ? void 0 : payload.user) === null || _a === void 0 ? void 0 : _a.name,
        customerEmail: (_b = payload === null || payload === void 0 ? void 0 : payload.user) === null || _b === void 0 ? void 0 : _b.email,
        customerPhone: (_c = payload === null || payload === void 0 ? void 0 : payload.user) === null || _c === void 0 ? void 0 : _c.phone,
        customerAddress: (_d = payload === null || payload === void 0 ? void 0 : payload.user) === null || _d === void 0 ? void 0 : _d.address,
    };
    const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData, bookingId);
    return paymentSession;
});
const paymentConfirmation = (_e) => __awaiter(void 0, [_e], void 0, function* ({ transactionId, bookingId, }) {
    let booking;
    const verifyResponse = yield (0, payment_utils_1.verifyPayment)(transactionId);
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        booking = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, {
            $set: {
                payment: "paid",
                transactionId: transactionId,
            },
        }, { new: true });
    }
    return booking;
});
exports.PaymentServices = {
    makePayment,
    paymentConfirmation,
};
